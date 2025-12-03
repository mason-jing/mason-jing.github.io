import { Html, useProgress } from '@react-three/drei';

export default function CanvasLoader() {
  const { progress } = useProgress();
  
  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span className="w-12 h-12 border-3 border-[rgba(145,94,255,0.2)] border-t-[#915eff] rounded-full animate-spin" />
      <p className="text-sm text-white/70 mt-4 font-medium">
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
}
