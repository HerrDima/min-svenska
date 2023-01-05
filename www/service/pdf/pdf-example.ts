// import pngImageSrc from '../../page/client/client-home/image/marker-icon-2x.png';

/* eslint-disable max-len */
export const htmlToPdfString = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"/>
        <style>
            @page {
                size: A4 landscape;
                margin: 0.4cm;
            }

            body {
                background-color: #00cccc;
            }
        </style>
    </head>
    <body>
        <h1>The pdf</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consectetur cum cupiditate, est, hic id, illo laudantium molestias omnis perspiciatis possimus voluptatum? Ad dolores molestiae sed. Consequatur repudiandae sit voluptas!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consectetur cum cupiditate, est, hic id, illo laudantium molestias omnis perspiciatis possimus voluptatum? Ad dolores molestiae sed. Consequatur repudiandae sit voluptas!</p>
    </body>
    </html>
`;

export const htmlToPdfStringLocal = `
    <div>
        <style>
            @page {
                size: A4 landscape;
                margin: 0.4cm;
            }

            body {
                background-color: #00cccc;
            }
        </style>
        <h1>The pdf</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consectetur cum cupiditate, est, hic id, illo laudantium molestias omnis perspiciatis possimus voluptatum? Ad dolores molestiae sed. Consequatur repudiandae sit voluptas!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consectetur cum cupiditate, est, hic id, illo laudantium molestias omnis perspiciatis possimus voluptatum? Ad dolores molestiae sed. Consequatur repudiandae sit voluptas!</p>
    </div>
`;
