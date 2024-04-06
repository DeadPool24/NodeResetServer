import express from 'express';
import path from 'path';

interface Options {
    port: number;
    publicPath?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;
    }

    async start() {

        this.app.use(express.static(this.publicPath));

        this.app.get('*', (request, response) => {
            const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
            response.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log('Server running');
        });

    }
}