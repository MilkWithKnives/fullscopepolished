/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Light grey scheme with orange accents
                coffee: {
                    900: "#2a2a2a",  // Medium grey for main backgrounds (lighter)
                    800: "#404040",  // Lighter grey for cards/sections
                    700: "#666666",  // Light grey for borders/subtle elements
                },
                mascarpone: "#FFFFFF",  // Pure white for text
                wine: "#FF6B35",        // Orange accent color
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
