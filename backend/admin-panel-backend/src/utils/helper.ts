export function generatePaginationLinks(currentPage: number, totalPages: number) {
    // const links = [];
    //
    // if (totalPages <= 10) {
    //     for (let i = 1; i <= totalPages; i++) {
    //         links.push(i);
    //     }
    // } else {
    //     links.push(1);
    //     if (currentPage > 4) {
    //         links.push('...');
    //     }
    //
    //     const start = Math.max(2, currentPage - 2);
    //     const end = Math.min(totalPages - 1, currentPage + 2);
    //
    //     for (let i = start; i <= end; i++) {
    //         links.push(i);
    //     }
    //
    //     if (currentPage < totalPages - 3) {
    //         links.push('...');
    //     }
    //     links.push(totalPages);
    // }
    //
    // return links;
    const links = [];

    if (totalPages <= 1) {
        for (let i = 1; i <= totalPages; i++) {
            links.push(i);
        }
        return links;
    }

    links.push(1)

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) {
        links.push('...');
    }

    for (let i = start; i <= end; i++) {
        links.push(i);
    }


    if (end < totalPages - 1) {
        links.push('...');
    }

    links.push(totalPages);

    return links;
}
