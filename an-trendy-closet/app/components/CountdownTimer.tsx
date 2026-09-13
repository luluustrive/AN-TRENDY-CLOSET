"use client";

import { useState, useEffect } from "react";
import { getTimeRemaining } from "@/lib/utils";

interface CountdownTimerProps {
  endDate: string;
  label?: string;
}

export default function CountdownTimer({
  endDate,
  label = "Sale Ends In",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.total <= 0) {
    return (
      <div className="countdown countdown--expired">
        <span>Sale Has Ended</span>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div className="countdown">
      <span className="countdown__label">{label}</span>
      <div className="countdown__boxes">
        {units.map((unit, i) => (
          <div key={unit.label} className="countdown__unit">
            <div className="countdown__value">
              {String(unit.value).padStart(2, "0")}
            </div>
            <span className="countdown__unit-label">{unit.label}</span>
            {i < units.length - 1 && (
              <span className="countdown__separator">:</span>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .countdown {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .countdown--expired {
          padding: 12px 24px;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-weight: 500;
        }

        .countdown__label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .countdown__boxes {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .countdown__unit {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .countdown__value {
          width: 58px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--text-primary), #3d3d3d);
          color: var(--white);
          font-size: 1.5rem;
          font-weight: 700;
          border-radius: var(--radius-md);
          font-variant-numeric: tabular-nums;
          box-shadow: var(--shadow-md);
          letter-spacing: 1px;
        }

        .countdown__unit-label {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-secondary);
          font-weight: 500;
          white-space: nowrap;
        }

        .countdown__unit {
          position: relative;
          flex-direction: column;
          padding-bottom: 20px;
        }

        .countdown__separator {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--rose-gold);
          margin: 0 2px;
          position: absolute;
          right: -10px;
          top: 18px;
        }

        @media (max-width: 480px) {
          .countdown__value {
            width: 48px;
            height: 52px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
