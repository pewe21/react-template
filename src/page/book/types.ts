

type BookType = {
    id: string;
    code: string;
    name: string;
    description: string;
    addedBy: {
        id: string;
        name: string;
    };
};

export type { BookType };