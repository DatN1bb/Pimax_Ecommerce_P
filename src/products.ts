import type { Product } from './types';

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Vr Headset",
        price: 349.99,
        category: "Electronics",
        image: "https://www.knoxlabs.com/cdn/shop/files/PimaxDreamAirSE_1200x1200.webp?v=1770237550",
        description: "Are you ready to take your gaming, fitness, and entertainment experiences to the next level? Look no further than the Pimax DreamAir SE VR headset. With its cutting-edge technology and immersive features, this headset is designed to transport you into a world of virtual reality like never before.",
        rating: { rate: 4.1, count: 153 }
    },
    {
        id: 2,
        name: "1440p Monitor",
        price: 399.99,
        category: "Electronics",
        image: "https://images.samsung.com/is/image/samsung/p6pim/my/ls27fg502eexxs/gallery/my-odyssey-g5-g50f-ls27fg502eexxs-550067365",
        description: "The Samsung Odyssey OLED G5 (LS27FG504SUXEN) is a 27-inch gaming monitor featuring revolutionary QD-OLED technology, which combines an exceptional contrast ratio of 1,000,000:1 with vibrant, accurate colors.",
        rating: { rate: 3.9, count: 77 }
    },
    {
        id: 3,
        name: "Speakers",
        price: 72.25,
        category: "Electronics",
        image: "https://www.dobratrgovina.com/media/catalog/product/cache/5fb3ce269f7bbfd648088fe6dfd9f5fb/4/2/42022b6a5af8fc5c0a476156d1d969fc_1.jpg",
        description: "The JBL Grip may be small enough to hold in one hand, but it packs powerful JBL Pro Sound. Using AI Sound Boost technology, it analyzes music in real time and employs an algorithm to optimize the sound for greater power with less distortion.",
        rating: { rate: 4.7, count: 239}
    },
    {
        id: 4,
        name: "Gaming Mikrofon",
        price: 122.15,
        category: "Electronics",
        image: "https://www.bigbang.si/upload/catalog/product/2922501/thumb/866351c2630149e23985a2d762f7e38ed4b56aae_6a95313b9f878_640x640r.webp",
        description: "The Razer Seiren V3 Chroma 32-bit DSP is a USB condenser microphone for streaming, gaming, podcasting, and recording.",
        rating: { rate: 2.2, count: 193 }
    }
];