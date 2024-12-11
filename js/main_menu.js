document.getElementById("start_button").addEventListener("click", () => {
    window.location.replace("/html/game_menu.html");
});

document.getElementById("difficulty_button").addEventListener("click", () => {
    document.getElementById("menu_title").innerHTML = "difficulty"
    document.getElementById("layer_menu").classList.toggle("display");
    document.getElementById("layer_diff").classList.toggle("display");
})

function showMainMenu() {
    const allLayers = document.querySelectorAll(".layer");
    allLayers.forEach(layer => {
        layer.classList.remove("display");
    });

    document.getElementById("menu_title").innerHTML = "menu";
    document.getElementById("layer_menu").classList.add("display");
}

document.getElementById("layer_diff").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON")
    {
        showMainMenu();
    }
})