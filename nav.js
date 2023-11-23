const nav = document.createElement("nav")
nav.innerHTML = `
    <a style="color: grey; text-decoration: none;" href="/"><h1>Puzzled</h1></a>
    <div class="links">
        <a ${location.pathname === "/" ? 'class="active"' : ""} href="/">Home</a>
        <a ${
            location.pathname === "" ? 'class="active"' : ""
        } href="wordle.html">Wordle</a>
    </div>
<div></div>
`

document.body.prepend(nav)