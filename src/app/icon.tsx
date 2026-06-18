import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: '#1e293b',
        borderRadius: 6,
        color: '#f8fafc',
        display: 'flex',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 22,
        fontWeight: 700,
        height: '100%',
        justifyContent: 'center',
        lineHeight: 1,
        width: '100%',
      }}
    >
      L
    </div>,
    size
  );
}
