from pathlib import Path
from struct import pack, unpack_from

work = Path(__file__).parent
source = (work / "royals-source.mp4").read_bytes()
duration = 18


def atoms(data):
    offset = 0
    while offset < len(data):
        length, kind = unpack_from(">I4s", data, offset)
        assert 8 <= length <= len(data) - offset, (kind, length)
        yield kind, data[offset + 8:offset + length]
        offset += length


def atom(kind, data):
    return pack(">I4s", len(data) + 8, kind) + data


def serialize(children):
    return b"".join(atom(kind, payload) for kind, payload in children.items())


def integers(data, offset=0):
    return unpack_from(">" + "I" * ((len(data) - offset) // 4), data, offset)


top = dict(atoms(source))
movie = dict(atoms(top[b"moov"]))
track = next(
    dict(atoms(data)) for kind, data in atoms(top[b"moov"])
    if kind == b"trak" and dict(atoms(dict(atoms(data))[b"mdia"]))[b"hdlr"][8:12] == b"vide"
)
media = dict(atoms(track[b"mdia"]))
media_info = dict(atoms(media[b"minf"]))
table = dict(atoms(media_info[b"stbl"]))

assert set(table) == {b"stsd", b"stts", b"stsc", b"stsz", b"stco", b"stss"}
_, timing_count, original_count, sample_ticks = integers(table[b"stts"])
_, default_size, explicit_count, *sample_sizes = integers(table[b"stsz"])
assert timing_count == 1 and default_size == 0
assert explicit_count == original_count == len(sample_sizes)
timescale = integers(media[b"mdhd"], 12)[0]
assert duration * timescale % sample_ticks == 0
count = duration * timescale // sample_ticks
assert count < original_count

chunks = integers(table[b"stco"], 8)
mapping = list(zip(*[iter(integers(table[b"stsc"], 8))] * 3))
sample_index = 0
mapping_index = 0
video_data = bytearray()
for chunk_index, chunk_offset in enumerate(chunks, 1):
    if mapping_index + 1 < len(mapping) and mapping[mapping_index + 1][0] == chunk_index:
        mapping_index += 1
    _, samples_per_chunk, description = mapping[mapping_index]
    assert description == 1
    next_index = min(sample_index + samples_per_chunk, count)
    chunk_size = sum(sample_sizes[sample_index:next_index])
    video_data.extend(source[chunk_offset:chunk_offset + chunk_size])
    sample_index = next_index
    if sample_index == count:
        break

assert sample_index == count
sync_frames = [number for number in integers(table[b"stss"], 8) if number <= count]
assert sync_frames[0] == 1
table[b"stts"] = pack(">IIII", 0, 1, count, sample_ticks)
table[b"stsz"] = pack(">III", 0, 0, count) + pack(f">{count}I", *sample_sizes[:count])
table[b"stsc"] = pack(">IIIII", 0, 1, 1, count, 1)
table[b"stss"] = pack(">II", 0, len(sync_frames)) + pack(f">{len(sync_frames)}I", *sync_frames)


def set_duration(data, offset, ticks):
    assert data[0] == 0
    return data[:offset] + pack(">I", ticks) + data[offset + 4:]


movie_timescale = integers(movie[b"mvhd"], 12)[0]
movie_header = set_duration(movie[b"mvhd"], 16, duration * movie_timescale)
track[b"tkhd"] = set_duration(track[b"tkhd"], 20, duration * movie_timescale)
media[b"mdhd"] = set_duration(media[b"mdhd"], 16, duration * timescale)


def make_movie(chunk_offset):
    table[b"stco"] = pack(">III", 0, 1, chunk_offset)
    media_info[b"stbl"] = serialize(table)
    media[b"minf"] = serialize(media_info)
    track[b"mdia"] = serialize(media)
    return atom(b"moov", atom(b"mvhd", movie_header) + atom(b"trak", serialize(track)))


file_type = atom(b"ftyp", top[b"ftyp"])
first_sample = len(file_type) + len(make_movie(0)) + 8
output = file_type + make_movie(first_sample) + atom(b"mdat", video_data)
(work / "royals-frames" / "royals-community-demo.mp4").write_bytes(output)
