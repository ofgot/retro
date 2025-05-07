export async function loadTiles(tileImages, tileSources) {
    const promises = tileSources.map(srcObj => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = srcObj.src;
            img.onload = () => resolve(img);
        });
    });

    const loaded = await Promise.all(promises);
    tileImages.push(...loaded);
}