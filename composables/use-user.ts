import type { GatewayActivity } from 'discord-api-types/v10';

export const useUser = () => {
	return useState<LanyardUser>('user', () => ({
		spotify: null,
		listening_to_spotify: true,
		kv: {},
		discord_user: {
			username: 'engi.harsh',
			public_flags: 0,
			id: '859312028137422858',
			discriminator: '0000',
			bot: false,
			avatar: '872101e269c6c8a98e1d068594fd1d84'
		},
		discord_status: 'dnd',
		activities: [
			
		],
		active_on_discord_web: true,
		active_on_discord_mobile: true,
		active_on_discord_desktop: true
	}));
};

export interface LanyardUser {
	spotify: null;
	listening_to_spotify: boolean;
	kv: {};
	discord_user: DiscordUser;
	discord_status: Status;
	activities: GatewayActivity[
		
	];
	active_on_discord_web: boolean;
	active_on_discord_mobile: boolean;
	active_on_discord_desktop: boolean;
}

export interface DiscordUser {
	username: string;
	public_flags: number;
	id: string;
	discriminator: string;
	bot: boolean;
	avatar: string;
}

export type Status = 'online' | 'idle' | 'dnd' | 'offline';

export enum LanyardOpcode {
	Event,
	Hello,
	Initialize,
	Heartbeat
}

export type LanyardIncomingPayload = LanyardEventInitStatePayload | LanyardEventPresenceUpdatePayload | LanyardHelloPayload;

interface LanyardEventInitStatePayload {
	op: LanyardOpcode.Event;
	seq: number;
	t: 'INIT_STATE';
	d: LanyardUser;
}

interface LanyardEventPresenceUpdatePayload {
	op: LanyardOpcode.Event;
	seq: number;
	t: 'INIT_STATE';
	d: LanyardUser;
}

interface LanyardHelloPayload {
	op: LanyardOpcode.Hello;
	d: { heartbeat_interval: number };
}
