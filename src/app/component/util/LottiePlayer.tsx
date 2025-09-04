// components/LottiePlayer.jsx
import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(
    () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
    {
        ssr: false,
    }
);

export default LottiePlayer;