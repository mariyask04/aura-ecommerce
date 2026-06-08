const products = [
    {
        name: "Wireless Headphones",
        price: 2999,
        description: "Immerse yourself in rich, studio-quality sound with our premium noise-cancelling wireless headphones. Featuring 40mm dynamic drivers, up to 30 hours of battery life, and adaptive ANC technology that blocks out up to 95% of ambient noise. The over-ear cushioned design ensures all-day comfort, while the foldable build makes it perfect for travel. Compatible with all Bluetooth 5.0 devices, with a low-latency mode for seamless video and gaming use.",
        images: [
            "https://m.media-amazon.com/images/I/31nfb1+SSiL._SY300_SX300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/817SiU5QPOL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61N8nU9rSPL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61P-arTEeqL._SX522_.jpg"
        ]
    },

    {
        name: "Smart Watch",
        price: 4999,
        description: "Take control of your health and lifestyle with this feature-packed smartwatch. Track heart rate, SpO2, sleep quality, stress levels, and over 100 workout modes — all from your wrist. The 1.43\" AMOLED display delivers vivid visuals even in direct sunlight, while the 7-day battery life keeps you going without constant charging. Water-resistant up to 50 metres, with customisable watch faces and instant smartphone notifications for calls, messages, and apps.",
        images: [
            "https://m.media-amazon.com/images/I/41V31PxyG5L._SY300_SX300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/71OwzwUFYsL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/71VFcATzAXL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/7146YgdfeaL._SX522_.jpg"
        ]
    },

    {
        name: "Bluetooth Speaker",
        price: 1999,
        description: "Bring the party anywhere with this rugged, portable Bluetooth speaker that delivers surprisingly powerful 360° surround sound. Dual passive radiators and a precision-tuned driver produce deep bass and crystal-clear highs. IPX7 waterproof and dustproof rated — perfect for beaches, hikes, and poolside sessions. Pair two speakers together for true stereo mode, and enjoy up to 12 hours of continuous playback on a single charge. Built-in mic for hands-free calls.",
        images: [
            "https://m.media-amazon.com/images/I/41gDSgSVFfL._SX300_SY300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/81rlY-6+OiL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61tuaDmCJ7L._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61uYHg+KHGL._SX522_.jpg"
        ]
    },

    {
        name: "Gaming Mouse",
        price: 1499,
        description: "Engineered for competitive gaming, this high-precision mouse features a 16,000 DPI optical sensor with adjustable sensitivity in 100 DPI steps for pixel-perfect accuracy. Seven programmable buttons, ultra-fast 1ms polling rate, and a lightweight 95g body give you the edge in fast-paced titles. Textured rubber side grips prevent slipping during intense sessions, and onboard memory saves your profile across PCs. Compatible with all major operating systems.",
        images: [
            "https://m.media-amazon.com/images/I/315pF79XSnL._SY300_SX300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/61NFa-49TsL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61Q1UYj3t0L._SX522_.jpg",
            "https://m.media-amazon.com/images/I/714pMQATTvL._SX522_.jpg"
        ]
    },

    {
        name: "Mechanical Keyboard",
        price: 3499,
        description: "Elevate your typing and gaming experience with this full-size mechanical keyboard featuring per-key RGB backlighting with 16.8 million colour options and 20 dynamic lighting effects. Hot-swappable switches let you customise the feel — choose between tactile, clicky, or linear — without soldering. Double-shot PBT keycaps resist fade and shine even after years of heavy use. A detachable braided USB-C cable and sturdy aluminium base plate round out this premium build.",
        images: [
            "https://m.media-amazon.com/images/I/51CLTpevT0L._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61JRo0atdSL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61aTYEnkOUL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61JM0i9U1PL._SX522_.jpg"
        ]
    },

    {
        name: "Laptop Stand",
        price: 999,
        description: "Reduce neck and back strain with this sleek, ergonomic laptop stand crafted from aerospace-grade aluminium alloy. Six adjustable height settings (15–25 cm) and a 360° rotating base let you find the perfect viewing angle for any setup. The hollow ventilated design keeps your laptop cool during extended sessions, while non-slip silicone pads protect your desk and device from scratches. Folds flat in seconds for easy transport — fits in most laptop bags. Supports laptops up to 17\".",
        images: [
            "https://m.media-amazon.com/images/I/41OYL66AQOL._SX300_SY300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/81uh9uGRagL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/81xGVVx0N0L._SX522_.jpg",
            "https://m.media-amazon.com/images/I/810nqFtklCL._SX522_.jpg"
        ]
    },

    {
        name: "USB-C Hub",
        price: 1799,
        description: "Turn your single USB-C port into a complete workstation with this 7-in-1 hub. Expand connectivity with 4K HDMI output (60 Hz), 100W Power Delivery pass-through charging, two USB-A 3.0 ports (5Gbps), an SD and microSD card reader, and a Gigabit Ethernet port — all in a compact aluminium body. Plug-and-play with no drivers needed on Windows, macOS, and ChromeOS. Supports simultaneous data transfer and charging without any performance throttling.",
        images: [
            "https://m.media-amazon.com/images/I/71DgdWWooDL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/71f4CGAJ9FL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61EOCctihsL._SX522_.jpg",
            "https://m.media-amazon.com/images/I/71zTUQ6CN1L._SX522_.jpg"
        ]
    },

    {
        name: "Webcam",
        price: 2499,
        description: "Look your best on every video call with this Full HD 1080p webcam featuring autofocus, automatic low-light correction, and a wide 90° field of view. The dual built-in noise-cancelling microphones capture your voice clearly while filtering out background distractions like fans and keyboard clicks. Universal clip mounting fits monitors, laptops, and tripods. Plug-and-play USB setup works instantly with Zoom, Teams, Google Meet, OBS, and all major streaming platforms — no software required.",
        images: [
            "https://m.media-amazon.com/images/I/31mBhp9RU6L._SY300_SX300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/611KoJnsgbL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71J+jgfBEoL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/610rFOe7cRL._SX679_.jpg"
        ]
    }
];

export default products;