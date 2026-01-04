import { useTranslation } from 'react-i18next';
import { supportedLanguages, changeLanguage } from '@/i18n';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    showLabel?: boolean;
}

export const LanguageSelector = ({
    variant = 'ghost',
    size = 'sm',
    showLabel = false
}: LanguageSelectorProps) => {
    const { i18n } = useTranslation();
    const currentLang = supportedLanguages.find(l => l.code === i18n.language) || supportedLanguages[0];

    const handleLanguageChange = (langCode: string) => {
        changeLanguage(langCode);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} size={size} className="gap-2">
                    <span className="text-lg">{currentLang.flag}</span>
                    {showLabel && <span className="hidden sm:inline">{currentLang.name}</span>}
                    <Globe className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
                {supportedLanguages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center gap-2 cursor-pointer ${i18n.language === lang.code ? 'bg-accent' : ''
                            }`}
                    >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
