import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Patient } from '@/pages/resources/ClinicMap';
import { User, GripVertical, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface DraggablePatientProps {
    patient: Patient;
    isOverlay?: boolean;
}

export const DraggablePatient: React.FC<DraggablePatientProps> = ({ patient, isOverlay }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: patient.id,
        data: patient,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const getSeverityColor = (severity: Patient['severity']) => {
        switch (severity) {
            case 'critical': return 'border-l-4 border-l-red-600 bg-red-50';
            case 'high': return 'border-l-4 border-l-orange-500 bg-orange-50';
            case 'medium': return 'border-l-4 border-l-yellow-500';
            default: return 'border-l-4 border-l-green-500';
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={cn(
                "touch-none cursor-grab active:cursor-grabbing",
                isDragging && "opacity-50",
                isOverlay && "scale-105 shadow-2xl rotate-2 opacity-90 z-50 pointer-events-none"
            )}
        >
            <Card className={cn(
                "p-3 mb-3 hover:shadow-md transition-all flex items-center gap-3 bg-card",
                getSeverityColor(patient.severity)
            )}>
                <GripVertical className="h-5 w-5 text-muted-foreground/50" />

                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{patient.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{patient.condition}</p>
                </div>

                {patient.severity === 'critical' && (
                    <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
                )}
            </Card>
        </div>
    );
};
