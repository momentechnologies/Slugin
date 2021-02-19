export default meta => {
    if (!meta) return true;

    return !meta.loading && !meta.loadedAt && !meta.error;
};
