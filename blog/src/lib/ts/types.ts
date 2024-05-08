export type Post = {
	name: string;
	summary: string;
	content: string;
	metaData: MetaData;
};

export type MetaData = {
	date: string;
	timeToRead: number;
};
