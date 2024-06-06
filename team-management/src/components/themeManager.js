export function getTheme() {
    const theme = localStorage.getItem("theme")
    if (theme == "light_theme") {
        document.body.classList.remove("dark_theme")
        document.body.classList.add("light_theme")
    }
    if (theme == "dark_theme") {
        document.body.classList.remove("light_theme")
        document.body.classList.add("dark_theme")
    }
}

export function setTheme(theme) {
    localStorage.setItem("theme", theme)
}

export function getColorSchemeTheme() {
    const theme = localStorage.getItem("theme")
    if (theme == "light_theme") {
        return "light"
    }
    if (theme == "dark_theme") {
        return "dark"
    }
}

export function getSelectColorScheme() {
    const theme = localStorage.getItem("theme")
    if (theme == "light_theme") {
        return
    }
    if (theme == "dark_theme") {
        return {
            option: (defaultStyles, state) => ({
                ...defaultStyles,
                color: state.isSelected ? "#212529" : "#fff",
                backgroundColor: state.isSelected ? "#a0a0a0" : "#212529", '&:hover': { backgroundColor: state.isSelected ? '#a0a0a0' : '#3696F7' }

            }),

            hover: (defaultStyles) => ({
                ...defaultStyles,
                color: state.isSelected ? "#FF0000" : "#FF0000",
                backgroundColor: state.isSelected ? "#FF0000" : "#FF0000",

            }),

            control: (defaultStyles) => ({
                ...defaultStyles,
                backgroundColor: "#212529",
            }),
            multiValue: (defaultStyles) => ({ ...defaultStyles, color: "#FF0000" }),

        }
    }
}





