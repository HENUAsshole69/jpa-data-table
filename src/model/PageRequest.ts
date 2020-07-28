export interface PageRequest {
    sort:       Sort;
    page:       number;
    size:       number;
}



export type NullHandling = /**
 * Lets the data store decide what to do with nulls.
 */
    'NATIVE' |

    /**
     * A hint to the used data store to order entries with null values before non null entries.
     */
    'NULLS_FIRST' |

    /**
     * A hint to the used data store to order entries with null values after non null entries.
     */
    'NULLS_LAST';

export type Direction = 'ASC' | 'DESC'

export interface Order {
    direction: Direction;
    property: string;
    ignoreCase: boolean;
    nullHandling: NullHandling;
}

export interface Sort {
    orders: Order[];
}
