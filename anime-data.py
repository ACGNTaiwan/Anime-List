import os
import json
import re
from collections import defaultdict

database = defaultdict(dict)

for fn in os.listdir('anime-data'):
    if match := re.match("anime(\d{4}).(\d{2}).json", fn):
        year, month = match.groups()
        database[int(year)][int(month)] = fn

with open("anime-data/anime-data.json", "w", encoding="utf-8") as f:
    json.dump(database, f)