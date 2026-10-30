"""Extract identifiable delivered hero markup for local design comparison."""
from pathlib import Path
from bs4 import BeautifulSoup
import json
root=Path(__file__).resolve().parents[1]/'reference/sites'
for name in ['cleveland','atlantic-health','aventura']:
    folder=root/name
    soup=BeautifulSoup((folder/'index.html').read_text(encoding='utf8',errors='replace'),'html.parser')
    h=soup.find('h1')
    if not h:continue
    section=h.find_parent('section') or h.parent.parent
    out=folder/'extracted';out.mkdir(exist_ok=True)
    (out/'hero-fragment.html').write_text(str(section),encoding='utf8')
    classes=sorted({c for el in [section,*section.find_all(True)] for c in el.get('class',[])})
    rules=[]
    import re
    for css in folder.rglob('*.css'):
        if 'extracted' in css.parts:continue
        for rule in re.findall(r'[^{}]+\{[^{}]*\}',css.read_text(encoding='utf8',errors='replace')):
            selector=rule.split('{',1)[0]
            if any(re.search(r'\.'+re.escape(c)+r'(?![\w-])',selector) for c in classes):rules.append(rule)
    (out/'hero-matching-rules.css').write_text('\n'.join(dict.fromkeys(rules)),encoding='utf8')
    (out/'README.md').write_text('# Extracted reference hero\n\nActual delivered hero markup and matching simple CSS rules, for inspection. This is a fragment, not a standalone component. Global styles, font assets, scripts and layout dependencies are not rewritten. Not imported by the SehatFirstPro app. Consult the parent manifest for original URLs.\n',encoding='utf8')
    print(name,'hero extracted;',len(rules),'matching simple CSS rules')
