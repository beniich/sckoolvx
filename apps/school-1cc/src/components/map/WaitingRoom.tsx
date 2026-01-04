import React from 'react';
import { Patient } from '@/pages/resources/ClinicMap';
import { DraggablePatient } from './DraggablePatient';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Clock } from 'lucide-react';

interface WaitingRoomProps {
    patients: Patient[];
}

export const WaitingRoom: React.FC<WaitingRoomProps> = ({ patients }) => {
    return (
        <Card className="h-full border-l border-border bg-sidebar/50 backdrop-blur shadow-lg flex flex-col">
            <CardHeader className="pb-3 border-b border-border/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Salle d'attente
                    </CardTitle>
                    <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        {patients.length}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-4 space-y-2">
                {patients.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center gap-2 opacity-50">
                        <Clock className="h-10 w-10" />
                        <p>Salle d'attente vide</p>
                    </div>
                ) : (
                    patients.map((patient) => (
                        <DraggablePatient key={patient.id} patient={patient} />
                    ))
                )}
            </CardContent>
        </Card>
    );
};
