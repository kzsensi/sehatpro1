from pathlib import Path

bundle = Path(__file__).resolve().parents[1] / "app/static/js/main.80a280cc.js"
text = bundle.read_text(encoding="utf-8")
original = 'case"sehatfirstpro.com":return{shortName:"sehatfirstpro",prefix:"/app"}'
patched = 'case"localhost":case"127.0.0.1":' + original
if original not in text:
    raise SystemExit("Expected tenant switch not found")
bundle.write_text(text.replace(original, patched), encoding="utf-8")
print("Customer tenant set for localhost")
