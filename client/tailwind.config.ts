import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: ["src/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'Inter',
    				'system-ui',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'Segoe UI',
    				'Roboto',
    				'Helvetica Neue',
    				'Arial',
    				'sans-serif'
    			],
    			display: [
    				'Inter',
    				'system-ui',
    				'sans-serif'
    			],
    			mono: [
    				'JetBrains Mono',
    				'Menlo',
    				'Monaco',
    				'Consolas',
    				'Liberation Mono',
    				'Courier New',
    				'monospace'
    			]
    		},
    		fontSize: {
    			'display-large': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
    			'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
    			'display-small': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                }
            },
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		animation: {
    			"fade-in": "fade-in 0.5s ease-in-out",
    			"fade-out": "fade-out 0.5s ease-in-out",
    			"slide-in": "slide-in 0.5s ease-out",
    			"slide-out": "slide-out 0.5s ease-in",
    		},
    		keyframes: {
    			"fade-in": {
    				"0%": { opacity: "0" },
    				"100%": { opacity: "1" }
    			},
    			"fade-out": {
    				"0%": { opacity: "1" },
    				"100%": { opacity: "0" }
    			},
    			"slide-in": {
    				"0%": { transform: "translateX(-100%)" },
    				"100%": { transform: "translateX(0)" }
    			},
    			"slide-out": {
    				"0%": { transform: "translateX(0)" },
    				"100%": { transform: "translateX(100%)" }
    			}
    		}
    	}
    },
    plugins: [tailwindAnimate],
} satisfies Config;
