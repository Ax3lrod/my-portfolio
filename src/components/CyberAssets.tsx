import React from "react";

export const CornerBracket = ({
  className = "",
  flipX = false,
  flipY = false,
  size = 24,
  strokeWidth = 2,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  flipX?: boolean;
  flipY?: boolean;
  size?: number | string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className}`}
    style={{
      transform: `scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`,
    }}
    {...props}
  >
    <path
      d="M2 2H12M2 2V12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
    />
  </svg>
);

export const Crosshair = ({
  className = "",
  size = 24,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1" />
    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const TechGrid = ({
  className = "",
  width = "100%",
  height = "100%",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <defs>
      <pattern
        id="tech-grid-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.2"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tech-grid-pattern)" />
  </svg>
);

export const DecoratorLine = ({
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect x="0" y="4" width="2" height="2" fill="currentColor" />
    <rect x="5" y="4" width="2" height="2" fill="currentColor" />
    <rect x="10" y="4" width="60" height="2" fill="currentColor" />
    <rect x="75" y="4" width="2" height="2" fill="currentColor" />
    <rect x="80" y="4" width="2" height="2" fill="currentColor" />
    <rect x="85" y="4" width="15" height="2" fill="currentColor" />
  </svg>
);

export const PlusGrid = ({
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <defs>
      <pattern
        id="plus-grid"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M30 25V35M25 30H35"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#plus-grid)" />
  </svg>
);

export const HudFrameDiamond = ({
  className = "",
  size = 48,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Corners */}
    <path
      d="M 20 20 L 40 20 M 60 20 L 80 20 L 80 40 M 80 60 L 80 80 L 60 80 M 40 80 L 20 80 L 20 60 M 20 40 L 20 20"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="square"
    />
    {/* Center Diamond */}
    <path
      d="M 50 35 L 65 50 L 50 65 L 35 50 Z"
      stroke="currentColor"
      strokeWidth="4"
    />
  </svg>
);

export const HudScopeThree = ({
  className = "",
  size = 48,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Top Arc */}
    <path
      d="M 35 20 A 35 35 0 0 1 65 20"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Bottom Right Arc */}
    <path
      d="M 80 65 A 35 35 0 0 1 65 80"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Bottom Left Arc */}
    <path
      d="M 20 65 A 35 35 0 0 0 35 80"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      transform="rotate(90 27.5 72.5)" 
    /> 
    {/* Correction: Manual Arcs are hard. Let's use simpler approx: 
        Circle r=30. 3 Gaps.
    */}
    <circle cx="50" cy="50" r="2" fill="currentColor" />
    <path
      d="M 50 15 A 35 35 0 0 1 80.3 32.5" 
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      transform="rotate(0 50 50)"
    />
    <path
      d="M 50 15 A 35 35 0 0 1 80.3 32.5" 
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      transform="rotate(120 50 50)"
    />
    <path
      d="M 50 15 A 35 35 0 0 1 80.3 32.5" 
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      transform="rotate(240 50 50)"
    />
  </svg>
);

export const HudScopeTwo = ({
  className = "",
  size = 48,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Top Left Arc */}
    <path
      d="M 20 50 A 30 30 0 0 1 50 20"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Bottom Right Arc */}
    <path
      d="M 80 50 A 30 30 0 0 1 50 80"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);
