import GameView from "@/components/GameView";
import AboutUsView from "@/components/AboutUsView";

export default [
    {
        name: 'AboutUs',
        path: '/aboutUs',
        component: AboutUsView,
        props: true
    },
    {
        name: 'Game',
        path: '/:catchAll(.*)',
        component: GameView,
        props: true
    },

]