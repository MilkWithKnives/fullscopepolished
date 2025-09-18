/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                // your palette
                coffee: {
                    900: "#15100E",
                    800: "#1C1512",
                    700: "#221A17",
                },
                mascarpone: "#F6EFE6",
                wine: "#8F2432",
            },
            fontFamily: {
                // Montserrat for display/heads
                display: ["var(--font-montserrat)", "ui-sans-serif", "system-ui"],
                // Raleway for body/UI
                sans: ["var(--font-raleway)", "ui-sans-serif", "system-ui"],
            },
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    sm: "640px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1200px",
                    "2xl": "1320px",
                },
            },
            boxShadow: {
                card: "0 10px 30px rgba(0,0,0,.25)",
            },
        },
    },
    plugins: [],
};
