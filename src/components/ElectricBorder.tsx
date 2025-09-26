'use client'

import { useEffect } from 'react'

const ElectricBorder = () => {
  useEffect(() => {
    // Inject the CSS styles for the electric border effect
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      .electric-main-container {
        --color-1: oklch(0.67 0.36 20.89);
        --color-2: oklch(0.75 0.33 29.86);
        --color-3: oklch(0.8 0.29 42.36);
        --color-4: oklch(0.82 0.29 61.18);
        --color-5: oklch(0.8 0.29 82.1);
        --color-6: oklch(0.75 0.33 100.14);
        --color-7: oklch(0.67 0.36 140.89);
        --border-electric: #dd8448;
        --bg-1: oklch(0.15 0.1 232.73);
        --bg-2: oklch(0.12 0.05 232.73);
        --text-1: oklch(0.9 0.05 232.73);
        --text-2: oklch(0.7 0.1 232.73);
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: radial-gradient(50% 50% at 50% 50%, var(--bg-1) 0%, var(--bg-2) 100%);
        overflow: hidden;
        font-family: 'Inter', sans-serif;
        position: relative;
      }

      .electric-svg-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }

      .electric-card-container {
        position: relative;
        width: 400px;
        height: 240px;
        filter: url(#noiseFilter);
      }

      .electric-inner-container {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        overflow: hidden;
      }

      .electric-border-outer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 1px;
        background: conic-gradient(
          from 0deg,
          var(--color-1),
          var(--color-2),
          var(--color-3),
          var(--color-4),
          var(--color-5),
          var(--color-6),
          var(--color-7),
          var(--color-1)
        );
        border-radius: 16px;
        animation: electric-border-rotate 4s linear infinite;
      }

      .electric-main-card {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%);
        border-radius: 15px;
        position: relative;
        z-index: 2;
      }

      .electric-glow-layer-1 {
        position: absolute;
        top: -2px;
        left: -2px;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        background: conic-gradient(
          from 0deg,
          var(--color-1),
          var(--color-2),
          var(--color-3),
          var(--color-4),
          var(--color-5),
          var(--color-6),
          var(--color-7),
          var(--color-1)
        );
        border-radius: 18px;
        filter: blur(4px);
        opacity: 0.8;
        animation: electric-border-rotate 4s linear infinite;
        z-index: 0;
      }

      .electric-glow-layer-2 {
        position: absolute;
        top: -4px;
        left: -4px;
        width: calc(100% + 8px);
        height: calc(100% + 8px);
        background: conic-gradient(
          from 0deg,
          var(--color-1),
          var(--color-2),
          var(--color-3),
          var(--color-4),
          var(--color-5),
          var(--color-6),
          var(--color-7),
          var(--color-1)
        );
        border-radius: 20px;
        filter: blur(8px);
        opacity: 0.6;
        animation: electric-border-rotate 4s linear infinite;
        z-index: -1;
      }

      .electric-overlay-1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        border-radius: 16px;
        z-index: 3;
      }

      .electric-overlay-2 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);
        border-radius: 16px;
        z-index: 3;
      }

      .electric-background-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, var(--border-electric) 0%, transparent 70%);
        opacity: 0.1;
        transform: translate(-50%, -50%);
        z-index: -2;
        animation: electric-pulse 3s ease-in-out infinite;
      }

      .electric-content-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 4;
      }

      .electric-content-top {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .electric-scrollbar-glass {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 4px 12px;
        font-size: 12px;
        font-weight: 500;
        color: var(--text-1);
        width: fit-content;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .electric-title {
        font-size: 24px;
        font-weight: 700;
        color: var(--text-1);
        margin: 0;
        line-height: 1.2;
      }

      .electric-divider {
        border: none;
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, var(--border-electric) 50%, transparent 100%);
        margin: 16px 0;
        opacity: 0.6;
      }

      .electric-content-bottom {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .electric-description {
        font-size: 14px;
        color: var(--text-2);
        margin: 0;
        line-height: 1.4;
      }

      @keyframes electric-border-rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes electric-pulse {
        0%, 100% {
          opacity: 0.1;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 0.2;
          transform: translate(-50%, -50%) scale(1.1);
        }
      }

      @media (max-width: 480px) {
        .electric-card-container {
          width: 320px;
          height: 200px;
        }

        .electric-content-container {
          padding: 20px;
        }

        .electric-title {
          font-size: 20px;
        }
      }
    `

    document.head.appendChild(styleSheet)

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [])

  return (
    <div className="electric-main-container">
      <svg className="electric-svg-container">
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
            >
              <animate
                attributeName="baseFrequency"
                values="0.9;1.2;0.9"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="2"/>
          </filter>
        </defs>
      </svg>

      <div className="electric-card-container">
        <div className="electric-inner-container">
          <div className="electric-border-outer">
            <div className="electric-main-card"></div>
          </div>
          <div className="electric-glow-layer-1"></div>
          <div className="electric-glow-layer-2"></div>
        </div>
        <div className="electric-overlay-1"></div>
        <div className="electric-overlay-2"></div>
        <div className="electric-background-glow"></div>
        <div className="electric-content-container">
          <div className="electric-content-top">
            <div className="electric-scrollbar-glass">Dramatic</div>
            <p className="electric-title">Electric Border</p>
          </div>
          <hr className="electric-divider" />
          <div className="electric-content-bottom">
            <p className="electric-description">
              In case you'd like to emphasize something very dramatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElectricBorder