import { Timestamp } from "firebase/firestore";

export type LinkDetails = {
    id: string
    name: string
    link: string
    shortLink: string
    clicks: number
    createdAt: Timestamp
    customSlug?: string
}

export type CreateLink = Omit<LinkDetails, 'id'>;

export type EditLinkDetails = {
    name: string;
    link: string;
    customSlug?: string
}

export type FullLinkDetails = LinkDetails & {
    QrCode: string;
};

export type TemporaryLink = Omit <LinkDetails, 'id' | 'clicks' | 'name' | 'customSlug'>;






























