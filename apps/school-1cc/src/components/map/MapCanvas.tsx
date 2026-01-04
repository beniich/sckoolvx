import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Room } from '@/pages/resources/ClinicMap';
import { RoomNode } from './RoomNode';

interface MapCanvasProps {
    rooms: Room[];
}

export const MapCanvas: React.FC<MapCanvasProps> = ({ rooms }) => {
    // We can create a grid layout here
    return (
        <div className="grid grid-cols-4 gap-6 p-4 min-w-[800px]">
            {rooms.map((room) => (
                <RoomNode key={room.id} room={room} />
            ))}

            {/* Empty slots for visual grid effect */}
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={`empty-${i}`} className="h-40 rounded-xl border-2 border-dashed border-border/30 flex items-center justify-center text-muted-foreground/20">
                    <span className="text-4xl font-thin">+</span>
                </div>
            ))}
        </div>
    );
};
