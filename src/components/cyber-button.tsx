
'use client';

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CyberButtonProps {
    icon: ReactNode;
    label: string;
    isSelected: boolean;
    onMouseEnter: () => void;
    onClick?: () => void;
    className?: string;
}

export default function CyberButton({ icon, label, isSelected, onMouseEnter, onClick, className }: CyberButtonProps) {
    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className={cn(
                'cyber-button group flex-shrink-0',
                { 'is-selected': isSelected },
                className
            )}
        >
            <div className="cyber-button-content">
                {icon}
                <span className="cyber-button-text">
                    {label}
                </span>
            </div>
        </button>
    );
}
