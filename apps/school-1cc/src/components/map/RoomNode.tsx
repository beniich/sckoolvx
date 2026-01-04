import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Room } from '@/pages/resources/ClinicMap';
import { Bed, Activity, User, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomNodeProps {
    room: Room;
}

export const RoomNode: React.FC<RoomNodeProps> = ({ room }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: room.id,
        disabled: room.status === 'occupied' || room.status === 'maintenance',
    });

    const getStatusColor = (status: Room['status']) => {
        switch (status) {
            case 'available': return 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20';
            case 'occupied': return 'border-red-500/50 bg-red-500/10';
            case 'cleaning': return 'border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20';
            case 'maintenance': return 'border-gray-500/50 bg-gray-500/10';
            default: return 'border-border';
        }
    };

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "relative h-40 rounded-xl border-2 transition-all duration-300 p-4 flex flex-col justify-between group",
                getStatusColor(room.status),
                isOver && "scale-105 shadow-xl ring-2 ring-primary border-primary bg-primary/10",
                "cursor-default"
            )}
        >
            <div className="flex justify-between items-start">
                <span className="font-bold text-sm bg-background/50 backdrop-blur px-2 py-1 rounded-md">
                    {room.name}
                </span>
                <div className={cn(
                    "h-3 w-3 rounded-full shadow-sm animate-pulse",
                    room.status === 'available' ? "bg-green-500" :
                        room.status === 'occupied' ? "bg-red-500" : "bg-yellow-500"
                )} />
            </div>

            <div className="flex-1 flex items-center justify-center">
                {room.status === 'occupied' ? (
                    <div className="flex flex-col items-center gap-2 animate-in zoom-in duration-300">
                        <div className="h-12 w-12 rounded-full bg-background border-2 border-foreground/10 flex items-center justify-center shadow-sm">
                            <User className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xs font-medium bg-background/80 px-2 py-0.5 rounded-full">Patient #{room.patientId}</span>
                    </div>
                ) : room.status === 'cleaning' ? (
                    <Sparkles className="h-10 w-10 text-yellow-500 animate-spin-slow opacity-50" />
                ) : (
                    <Bed className="h-10 w-10 text-muted-foreground/30 group-hover:text-green-500/50 transition-colors" />
                )}
            </div>

            <div className="flex justify-between items-end text-xs text-muted-foreground">
                <span className="uppercase tracking-wider opacity-70">{room.type}</span>
                {room.status === 'occupied' && <Activity className="h-4 w-4 text-red-400 animate-pulse" />}
            </div>

            {isOver && room.status === 'available' && (
                <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                    <span className="font-bold text-green-600 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                        Assigner ici
                    </span>
                </div>
            )}
        </div>
    );
};
