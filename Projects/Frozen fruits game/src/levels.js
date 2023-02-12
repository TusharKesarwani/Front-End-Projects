const LEVELS = [
    /*{
        name: 'Test 1',
        diff: 'easy',
        author: 'pkubiak',
        players: [{x: 200, y: 500, baseAngle: 40, maxAngle: 30, speed: 0.5}],
        board: [
            "               ",
            " 1 1 1 1 1 1 1 ",
        ]
    },
    {
        name: 'Test 2',
        diff: 'easy',
        author: 'pkubiak',
        players: [
            {x: 100, y: 500, speed: 1.0},
            {x: 220, y: 500, speed: 2.0},
        ],
        board: [
            "1 1 1 1 1 1 1 1",
            " 1 1 1 1 1 1 1 ",
            "1 1 1 1 1 1 1 1",
            " 1 1 1 1 1 1 1 ",
            "1 1 1 1 1 1 1 1",
            " 1 1 1 1 1 1 1 ",
            "1 1 1 1 1 1 1 1",
            " 1 1 1 1 1 1 1 ",
            "1 1 1 1 1 1 1 1",
            " 1 1 1 1 1 1 1 ",
            "1 1 1 1 1 1 1 1",
            " 1 1 1 1 1 1 1 ",
            "1 1 1 1 1 1 1 1",
            // " 1 1 1 1 1 1 1 ",
        ]
    },*/
    {
        name: 'Random Fruit Shake',
        diff: 'medium',
        author: 'alisha',
        players: 'default',
        board: function() {
            let rows = [];
            for(let y=0;y<7;y++) {
                let row = '';
                for(let x=0;x<15;x++)
                    row += ((x^y)&1)==0 ? Math.floor(8 * Math.random()) : ' ';
                rows.push(row);
            }
            return rows;
        }
    },
    {
        name: 'Team Fruit Salad',
        diff: 'easy',
        author: 'alisha',
        players: [
            {x: 100, y: 500, fruits: '01'},
            {x: 220, y: 500, fruits: '56'}
        ],
        board: function() {
            let rows = [];
            for(let y=0;y<7;y++) {
                let row = '';
                for(let x=0;x<15;x++)
                    row += ((x^y)&1)==0 ? 5*(y%2) + Math.floor(2 * Math.random()) : ' ';
                rows.push(row);
            }
            return rows;
        }
    },
    {
        name: 'Monochromatic Salad',
        diff: 'easy',
        author: 'alisha',
        players: [
            {x: 160, y: 500, fruits: '0'}
        ],
        board: [
            "0   0   0   0  ",
            "               ",
            "  0   0   0   0",
            "               ",
            "0   0   0   0  ",
            "               ",
            "  0   0   0   0",
            "               ",
            "0   0   0   0  ",
        ]
    },
    {
        name: 'Fruit Salad',
        diff: 'easy',
        author: 'alisha',
        players: [
            {x: 100, y: 500, fruits: '01234'},
            {x: 220, y: 500, fruits: '01234'},
        ],
        board: [
            "0 0 0 0 0 0 0 0",
            " 1 1 1 1 1 1 1 ",
            "2 2 2 2 2 2 2 2",
            " 3 3 3 3 3 3 3 ",
            "4 4 4 4 4 4 4 4",
        ]
    },
    {
        name: 'Side by Side',
        diff: 'medium',
        author: 'alisha',
        players: [
            {x: 20, y: 500, baseAngle: 65, maxAngle: 20},
            {x: 300, y: 500, baseAngle: -65, maxAngle: 20},
        ],
        board: [
            "0 0 0 0 0 0 0 0",
            " 1 1 1 1 1 1 1 ",
            "2 2 2 2 2 2 2 2",
            " 3 3 3 3 3 3 3 ",
            "4 4 4 4 4 4 4 4",
            "               ",
            "               ",
            "               ",
            "      x x      "
        ]
    },
    {
        name: 'Fruit Shake',
        diff: 'hard',
        author: 'alisha',
        players: [
            {x: 100, y: 500, speed: 1.0},
            {x: 220, y: 500, speed: 2.0},
        ],
        board: [
            "0 1 2 3 4 0 1 2",
            " 2 3 4 0 1 2 3 ",
            "3 4 0 1 2 3 4 0",
            " 0 1 2 3 4 0 1 ",
            "x 2 3 4 0 1 2 x",
            " x x       x x ",
            "x             x",
        ]
    },
    {
        name: 'Double-slit Young Fruit',
        diff: 'hard',
        author: 'alisha',
        players: [
            {x: 100, y: 500, speed: 1.0},
            {x: 220, y: 500, speed: 2.0},
        ],
        board: [
            "1 1 1 1 2 2 2 2",
            " 1 1 1 3 2 2 2 ",
            "  1 1 3 3 2 2  ",
            "   1 3 3 3 2   ",
            "      3 3      ",
            "       3       ",
            "               ",
            "               ",
            "x     x x     x",
        ]
    },


    // From: https://github.com/kthakore/frozen-bubble/blob/master/share/data/levels
    {
        "name": "Level 1",
        "diff": "original",
        "players": "default",
        "board": [
            "6 6 4 4 2 2 3 3",
            " 6 6 4 4 2 2 3 ",
            "2 2 3 3 6 6 4 4",
            " 2 3 3 6 6 4 4 ",
            "               ",
            "               ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 2",
        "diff": "original",
        "players": "default",
        "board": [
            "  7 7 7 7 7 7  ",
            "   1 1 1 1 1   ",
            "    2 2 2 2    ",
            "       2       ",
            "      2 2      ",
            "       5       ",
            "      5 5      ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 3",
        "diff": "original",
        "players": "default",
        "board": [
            "    7     7    ",
            "     7 1 7     ",
            "      1 2      ",
            "     1 2 1     ",
            "      2 5      ",
            "     3 5 3     ",
            "      5 3      ",
            "       3       ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 4",
        "diff": "original",
        "players": "default",
        "board": [
            "      0 0      ",
            "     5 0 1     ",
            "    3 5 1 6    ",
            "   4 3   6 7   ",
            "  7 4     7 4  ",
            " 6 7       4 3 ",
            "1 6         3 5",
            " 1           5 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 5",
        "diff": "original",
        "players": "default",
        "board": [
            "    0 0 0 0    ",
            "   0 1 1 1 0   ",
            "  0 1 0 0 1 0  ",
            "   0 1 1 1 0   ",
            "    0 0 0 0    ",
            "     7   7     ",
            "    7 7 7 7    ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 6",
        "diff": "original",
        "players": "default",
        "board": [
            "  4 4 4 6 6 6  ",
            " 4           6 ",
            "  4         6  ",
            " 4 2 3 1 2 3 6 ",
            "  3 1 2 3 1 2  ",
            "               ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 7",
        "diff": "original",
        "players": "default",
        "board": [
            "  4 4 4 6 6 6  ",
            " 4           6 ",
            "  4         6  ",
            " 4 2 3 1 2 3 6 ",
            "  3 1 2 3 1 2  ",
            "   2 3 1 2 3   ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 8",
        "diff": "original",
        "players": "default",
        "board": [
            "  0 0     2 2  ",
            "   5       3   ",
            "  0       6    ",
            "   3       0   ",
            "  4       5    ",
            "   2       3   ",
            "  2       1    ",
            "   3       4   ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 9",
        "diff": "original",
        "players": "default",
        "board": [
            "3             3",
            " 6 3 2 4 6 3 2 ",
            "4             4",
            " 2 4 6 3 2 4 6 ",
            "      6        ",
            "       3       ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 10",
        "diff": "original",
        "players": "default",
        "board": [
            "  2   1   1   2",
            " 1 2   2 1   1 ",
            "1   1   2   2  ",
            " 2 1   1 2   2 ",
            "  2   2   2   2",
            " 1 2   2 1   1 ",
            "1   1   2   1  ",
            " 2 2   1 1   2 ",
            "  2   1   1   1",
            "               "
        ]
    },
    {
        "name": "Level 11",
        "diff": "original",
        "players": "default",
        "board": [
            "  7 7     5 5  ",
            " 1           4 ",
            "2 1         4 3",
            " 2           3 ",
            "1 2         3 4",
            " 1           4 ",
            "7 1         4 5",
            " 7 7       5 5 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 12",
        "diff": "original",
        "players": "default",
        "board": [
            "7 7         5 5",
            " 1 5       7 4 ",
            "2 1         4 3",
            " 2           3 ",
            "1 5         7 4",
            " 1           4 ",
            "7 1         4 5",
            " 7 5       7 5 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 13",
        "diff": "original",
        "players": "default",
        "board": [
            "      0 0      ",
            "     5 0 1     ",
            "    3 5 1 6    ",
            "   4 3 2 6 2   ",
            "  7 4 7 2 2 4  ",
            " 6 7 7 3 3 4 3 ",
            "1 6 1 1 1 3 3 5",
            " 1 1         5 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 14",
        "diff": "original",
        "players": "default",
        "board": [
            "    0     0    ",
            "   3 3   3 3   ",
            "  0 2 0 0 2 0  ",
            "   3 3   3 3   ",
            "    0     0    ",
            "               ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 15",
        "diff": "original",
        "players": "default",
        "board": [
            "      1 1      ",
            "     2 2 2     ",
            "    3 3 3 3    ",
            "   4 4 4 4 4   ",
            "  5 5 5 5 5 5  ",
            "       6       ",
            "      7 7      ",
            "       0       ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 16",
        "diff": "original",
        "players": "default",
        "board": [
            "      2 5      ",
            "   4 3         ",
            "6 7   5 2      ",
            "         3 4   ",
            "      2 5   7 6",
            "   4 3         ",
            "6 7   5 2      ",
            "         3 4   ",
            "            7 6",
            "               "
        ]
    },
    {
        "name": "Level 17",
        "diff": "original",
        "players": "default",
        "board": [
            "      5 5      ",
            "       3       ",
            "      1        ",
            "       7       ",
            "      2        ",
            "       4       ",
            "      5        ",
            "       3       ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 18",
        "diff": "original",
        "players": "default",
        "board": [
            "      0 1      ",
            "     0 2 7 7   ",
            "      0 1 7    ",
            "   0 0 0 0     ",
            "  0 0 0 1 1    ",
            " 0 0 0 1 1 1   ",
            "  0 0 1 1 1    ",
            "   0 0 0 7 7   ",
            "    7 7        ",
            "               "
        ]
    },
    {
        "name": "Level 19",
        "diff": "original",
        "players": "default",
        "board": [
            "  1            ",
            " 1             ",
            "  2 3 4 7 6 5  ",
            "             1 ",
            "            1  ",
            "   2 3 4 7 6   ",
            "  1            ",
            " 1             ",
            "  2 3 4 7 6 5  ",
            "               "
        ]
    },
    {
        "name": "Level 20",
        "diff": "original",
        "players": "default",
        "board": [
            "  6            ",
            " 5             ",
            "2 3 4 7 6 5 2 3",
            "             4 ",
            "            7  ",
            "   4 3 2 5 6   ",
            "  7            ",
            " 6             ",
            "5 2 3 4 7 6 5  ",
            "               "
        ]
    },
    {
        "name": "Level 21",
        "diff": "original",
        "players": "default",
        "board": [
            "3 2 1 0 0 1 2 3",
            " 3 2 1 0 1 2 3 ",
            "4 3 2 1 1 2 3 4",
            " 4 3 2 1 2 3 4 ",
            "5 4 3 2 2 3 4 5",
            " 5 4 3 2 3 4 5 ",
            "6 5 4 3 3 4 5 6",
            " 6 5 4 3 4 5 6 ",
            "7 6 5 4 4 5 6 7",
            "               "
        ]
    },
    {
        "name": "Level 22",
        "diff": "original",
        "players": "default",
        "board": [
            "      5 5      ",
            "       3       ",
            "      2 4      ",
            "       6       ",
            "      2 4      ",
            "   2   5   4   ",
            "1 0 1 0 1 0 1 0",
            " 3   3   2   6 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 23",
        "diff": "original",
        "players": "default",
        "board": [
            "        1      ",
            " 7 4 3 5       ",
            "6     1        ",
            "       5 3 4 7 ",
            "6       1     6",
            " 7 4 3 5       ",
            "      1       6",
            "       5 3 4 7 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 24",
        "diff": "original",
        "players": "default",
        "board": [
            "        7 3 6  ",
            "     3 7 3 6 3 ",
            "    5 7 3 6 3  ",
            "   6 7 3 6 7   ",
            "  7 7 3 6 1    ",
            " 3 7 3 6 3     ",
            "5 6 2 7 1      ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 25",
        "diff": "original",
        "players": "default",
        "board": [
            "5             5",
            " 5   6 6 6   5 ",
            "  5 4     4 5  ",
            "   3       3   ",
            "  6 0     0 6  ",
            "   3       3   ",
            "    4     4    ",
            "     6 6 6     ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 26",
        "diff": "original",
        "players": "default",
        "board": [
            "  7 0     0 7  ",
            " 7   0   0   7 ",
            "7 1   0 0   1 7",
            " 7 1 2 0 2 1 7 ",
            "7 6 3 2 2 3 6 7",
            " 7   3 2 3   7 ",
            "  7 7 3 3 7 7  ",
            "       3       ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 27",
        "diff": "original",
        "players": "default",
        "board": [
            "  3   1   7   6",
            " 5   7   7   6 ",
            "6   0   5   3  ",
            "   2   1   5   ",
            "  4   3   4    ",
            " 2   3   2     ",
            "    4   6      ",
            "       5       ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 28",
        "diff": "original",
        "players": "default",
        "board": [
            "        1      ",
            "         3     ",
            "6 1 3 1 2 1 4 1",
            "         6     ",
            "      4 1      ",
            "     1   3     ",
            "      2 1      ",
            "         4     ",
            "      6 1      ",
            "       6       "
        ]
    },
    {
        "name": "Level 29",
        "diff": "original",
        "players": "default",
        "board": [
            "      5 4      ",
            "     4 1 0     ",
            "      2 3      ",
            "   1 4   2 2   ",
            "  3 1 2 5 1 4  ",
            "   4 2   0 4   ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 30",
        "diff": "original",
        "players": "default",
        "board": [
            "        1      ",
            "       1       ",
            "  2     1   5  ",
            " 5     1     0 ",
            "  6     1   4  ",
            "   0   1   5   ",
            "    5 5 0 1    ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 31",
        "diff": "original",
        "players": "default",
        "board": [
            "      6 3      ",
            "     3 2 6     ",
            "    2 6 3 2    ",
            "   6 3 2 6 3   ",
            "  3 2 6 3 2 6  ",
            " 2 6 3 2 6 3 2 ",
            "6 3 2 6 3 2 6 3",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 32",
        "diff": "original",
        "players": "default",
        "board": [
            "6 6 6 6 6 6 6 6",
            " 4             ",
            "  3 2 5 7 6 4 3",
            "   5           ",
            "    7 6 4 3 2 5",
            "     4         ",
            "      3 2 5 7 6",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 33",
        "diff": "original",
        "players": "default",
        "board": [
            "1   7     6   2",
            " 6   1   6 1 3 ",
            "  4   7 2   7  ",
            " 2 7       4   ",
            "6   3 5 0 2   7",
            " 1           1 ",
            "  1 4 5 7 5 1  ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 34",
        "diff": "original",
        "players": "default",
        "board": [
            "6 6 6     6 6 6",
            "     6   6     ",
            "    2 3 3 2    ",
            "   3   5   3   ",
            "    5 3 3 5    ",
            "     6 1 6     ",
            "  4 2     2 4  ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 35",
        "diff": "original",
        "players": "default",
        "board": [
            "      5 5      ",
            "     5         ",
            "  3 4 6 6     5",
            " 3 3 4 6 5   5 ",
            "3 2 3 6 6 5 5  ",
            " 3 3 4 6 5   5 ",
            "  3 4 6 6     5",
            "     5         ",
            "      5 5      ",
            "               "
        ]
    },
    {
        "name": "Level 36",
        "diff": "original",
        "players": "default",
        "board": [
            "1             1",
            " 1   2 2 2   1 ",
            "  1 2 3 3 2 1  ",
            " 6 2 3   3 2 6 ",
            "6 2 3     3 2 6",
            " 6 2 3   3 2 6 ",
            "3 3 3 7 7 3 3 3",
            " 0 5 0 2 0 5 0 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 37",
        "diff": "original",
        "players": "default",
        "board": [
            "    7 7 7      ",
            "   7 2 2 7     ",
            "  7 5 5 5 7    ",
            " 7 7 7 7 7 7   ",
            "    6   6      ",
            "   6     6     ",
            "  6 4 4   6 4 4",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 38",
        "diff": "original",
        "players": "default",
        "board": [
            "  3 3   3 3 3  ",
            " 3 7 5 4 6 5 3 ",
            "1 3 3 3   3 3 1",
            " 2 1 2 1 2 1 2 ",
            "1 3 3   3 3 3 1",
            " 3 5 6 4 5 7 3 ",
            "2 3 3 3   3 3 2",
            " 1 1 2 2 2 1 1 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 39",
        "diff": "original",
        "players": "default",
        "board": [
            "  6 5          ",
            " 3 1 3         ",
            "  5 6          ",
            "     5 3       ",
            "    6 1 6      ",
            "     3 5       ",
            "        3 6    ",
            "       5 6 5   ",
            "        6 3    ",
            "               "
        ]
    },
    {
        "name": "Level 40",
        "diff": "original",
        "players": "default",
        "board": [
            "6 3 7 4 5 1 6 3",
            " 5 1 6 3 7 4 5 ",
            "6 3 7 4 5 1 6 3",
            "               ",
            "               ",
            "               ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 41",
        "diff": "original",
        "players": "default",
        "board": [
            "            4 4",
            "     7 7 7 4 4 ",
            "            4 4",
            "   1       7   ",
            "  1 1     7    ",
            " 3 3 3   7     ",
            "3   2 3 3 3   3",
            "   2   3   3 3 ",
            "  2            ",
            "               "
        ]
    },
    {
        "name": "Level 42",
        "diff": "original",
        "players": "default",
        "board": [
            "    4          ",
            "   7 4         ",
            "    7 4        ",
            "   4 7 4       ",
            "1 1 1 1 1 1 1  ",
            " 1 2 1 2 1 1   ",
            "2 2 2 2 2 2 2 2",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 43",
        "diff": "original",
        "players": "default",
        "board": [
            "0             6",
            " 6 1 4 3 7 5 0 ",
            "0             6",
            " 6 1 4 3 7 5 0 ",
            "0             6",
            " 6 1 4 3 7 5 0 ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 44",
        "diff": "original",
        "players": "default",
        "board": [
            "3 3 4 6 6 4 3 3",
            " 0 3 4 6 4 3 1 ",
            "5 1 3 4 4 3 0 1",
            " 0 1 3 4 3 1 0 ",
            "2 1 6 3 3 0 0 1",
            " 0 3 4 3 6 1 5 ",
            "6 1 2 6 4 0 0 2",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 45",
        "diff": "original",
        "players": "default",
        "board": [
            "6 6         4 4",
            " 4 0       3 6 ",
            "0 6         4 2",
            " 7           7 ",
            "4 4         5 6",
            " 6 4 7 7 5 6 4 ",
            "  7 6 4 6 4 7  ",
            "   0   7   7   ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 46",
        "diff": "original",
        "players": "default",
        "board": [
            "  5         4  ",
            "   5       4   ",
            "    5 6 6 4    ",
            "     2   2     ",
            "0 0 6     6 1 1",
            "     2   2     ",
            "    7 6 6 3    ",
            "   7       3   ",
            "  7         3  ",
            "               "
        ]
    },
    {
        "name": "Level 47",
        "diff": "original",
        "players": "default",
        "board": [
            "  6         2  ",
            " 1 7 1 1 1 3 1 ",
            "    4 1 1 4    ",
            "   1 3 1 7 1   ",
            "      2 6      ",
            "     1 5 1     ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 48",
        "diff": "original",
        "players": "default",
        "board": [
            "7 7 7 7 7 7 7 7",
            " 7           7 ",
            "7     2 0 5 2 2",
            " 7       0 3 6 ",
            "7           4 0",
            " 5 5           ",
            "4 3 6 2        ",
            " 0 2 0 4       ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 49",
        "diff": "original",
        "players": "default",
        "board": [
            "    1     1    ",
            "   4     5     ",
            "  7     1 1 1  ",
            " 6         7   ",
            "1 1 1 1   4    ",
            "     5         ",
            "    0          ",
            "   3           ",
            "  1            ",
            "               "
        ]
    },
    {
        "name": "Level 50",
        "diff": "original",
        "players": "default",
        "board": [
            "  7 7     7 7  ",
            " 6   4   4   6 ",
            "5     3 3     5",
            " 6           6 ",
            "  7         7  ",
            "   4       4   ",
            "    3     3    ",
            "     2   2     ",
            "      5 5      ",
            "               "
        ]
    },
    {
        "name": "Level 51",
        "diff": "original",
        "players": "default",
        "board": [
            "  0 0     0 0  ",
            " 7 4 6 6 6 4 3 ",
            "5 6 6 6 2 6 6 3",
            " 7 4 6 6 6 4 3 ",
            "  0 0     0 0  ",
            "               ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 52",
        "diff": "original",
        "players": "default",
        "board": [
            "          7 7 7",
            "         2 7 7 ",
            "  0 7 7 7   7 7",
            " 6 7 7 7       ",
            "6       7 7 7 7",
            " 6             ",
            "4 2 2 2 4   3  ",
            " 4 4 4 4 3 3 3 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 53",
        "diff": "original",
        "players": "default",
        "board": [
            "4     7   6   7",
            " 7 6 7     7 4 ",
            "    7     7    ",
            "   0 0 0 0 0 3 ",
            "    0 2 2 0 6 4",
            "     0 0 0 1 3 ",
            "      0 0   3 4",
            "       6   5 6 ",
            "            1 0",
            "               "
        ]
    },
    {
        "name": "Level 54",
        "diff": "original",
        "players": "default",
        "board": [
            "  5         5  ",
            " 0     0     0 ",
            "0 0 0 2 2 0 0 0",
            " 0     0     0 ",
            "  7   3     7  ",
            "     3 6       ",
            "      6        ",
            "   3 6         ",
            "  3            ",
            "               "
        ]
    },
    {
        "name": "Level 55",
        "diff": "original",
        "players": "default",
        "board": [
            "      6 5      ",
            "     2 6 3     ",
            "    5 4 7 1    ",
            "   6 2 2 3 4   ",
            "    3 7 3 6    ",
            "     1 3 2     ",
            "      4 5      ",
            "       4       ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 56",
        "diff": "original",
        "players": "default",
        "board": [
            "7 7   2 2   6 6",
            " 6     6     3 ",
            "2     1     2  ",
            " 5     3     2 ",
            "1     2     1  ",
            " 5     2     2 ",
            "6     1     7  ",
            " 5     5     4 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 57",
        "diff": "original",
        "players": "default",
        "board": [
            "      6 6      ",
            "   0 4 4 4 0   ",
            "      6 6      ",
            "     2 7 2     ",
            "      6 6      ",
            "   0 5 5 5 0   ",
            "      3 3      ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 58",
        "diff": "original",
        "players": "default",
        "board": [
            "    4 1 3      ",
            "   1     1     ",
            "    4 1 3 4 1  ",
            "   1 3 4     4 ",
            "  3     3 4 1  ",
            "   1 3 4 1 3   ",
            "    4 1        ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 59",
        "diff": "original",
        "players": "default",
        "board": [
            "  6 4   3 2 5  ",
            " 0           1 ",
            "  2 3 5   4 6  ",
            " 0           1 ",
            "  4 6   2 5 3  ",
            " 0           1 ",
            "  5 2 3   4 6  ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 60",
        "diff": "original",
        "players": "default",
        "board": [
            "      6 6      ",
            "     7 6 4     ",
            "  2 1 7 4 1 3  ",
            " 2 1 1 1 1 1 3 ",
            "  2 2 2 3 3 3  ",
            "       5       ",
            "      2 3      ",
            "       5       ",
            "    2 2 3 3    ",
            "               "
        ]
    },
    {
        "name": "Level 61",
        "diff": "original",
        "players": "default",
        "board": [
            "4   5     3   6",
            " 2   3   2   4 ",
            "4     1 0     6",
            " 6   2 3 5   4 ",
            "4     0 1     6",
            " 2   5   3   4 ",
            "4   3     2   6",
            " 6           4 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 62",
        "diff": "original",
        "players": "default",
        "board": [
            "2 6 0 5 5 1 3 4",
            " 1     2     0 ",
            "4     3 6     2",
            "       0       ",
            "      1 4      ",
            "       2       ",
            "      6 3      ",
            "       5       ",
            "      4 1      ",
            "               "
        ]
    },
    {
        "name": "Level 63",
        "diff": "original",
        "players": "default",
        "board": [
            "        5 1 1 3",
            " 0 5 1 0 5 3 3 ",
            "5 1 0 5 1 0 5 1",
            " 0 5 1 0 5 1 6 ",
            "        1 6 5 1",
            "         5 1 6 ",
            "        1 0 5 1",
            "         5 1 0 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 64",
        "diff": "original",
        "players": "default",
        "board": [
            "  0 7 3     2 2",
            "   0 7 3     2 ",
            "  0 7 3     2 2",
            "   0 7 3   3 1 ",
            "  0 7 3   6 4 5",
            "   0 7 3   7 0 ",
            "  0 7 3   2 3 4",
            "   0 7 3   5 6 ",
            "          7 0 1",
            "               "
        ]
    },
    {
        "name": "Level 65",
        "diff": "original",
        "players": "default",
        "board": [
            "      7 7 7 7  ",
            " 3 4 5       7 ",
            "2             3",
            " 7           4 ",
            "7       3 4 5 6",
            " 7     2 0 1 2 ",
            "6       3 4 5 6",
            " 0 1           ",
            "2 3 4          ",
            " 5 6 0         "
        ]
    },
    {
        "name": "Level 66",
        "diff": "original",
        "players": "default",
        "board": [
            "  7         2  ",
            " 1 1       3 3 ",
            "  2         4  ",
            " 3 3       5 5 ",
            "  4         6  ",
            " 5 5       1 1 ",
            "  6         7  ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 67",
        "diff": "original",
        "players": "default",
        "board": [
            "  4         4  ",
            " 2     1     2 ",
            "5     0 0     5",
            " 5     1     6 ",
            "  4 2 7 7 5 4  ",
            "       6       ",
            "      3 3      ",
            "       7       ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 68",
        "diff": "original",
        "players": "default",
        "board": [
            "  1     2 3 4  ",
            " 2     3 0 4   ",
            "4     2 3 1    ",
            " 3   4 3 0     ",
            "4     2 5 1    ",
            " 3   4 5 0 4   ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 69",
        "diff": "original",
        "players": "default",
        "board": [
            "2     1 1     2",
            " 2   3 3 3   2 ",
            "  2   4 4   2  ",
            "   7 7 0 7 7   ",
            "      4 4      ",
            "     5 7 5     ",
            "6 3 2 6 4 2 3 6",
            " 5           1 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 70",
        "diff": "original",
        "players": "default",
        "board": [
            "4 2 3 5 7 1 3 6",
            " 1     1     1 ",
            "3 0 1 3 2 4 3 5",
            " 4     4     4 ",
            "  5     5     5",
            " 0 3 2 0 4 5 0 ",
            "  6     6     6",
            " 7     7     7 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 71",
        "diff": "original",
        "players": "default",
        "board": [
            "  5 4   1 1    ",
            " 5   4 1   1   ",
            "0           0  ",
            " 0 6 4     4 2 ",
            "  4 3 5 2 6 3 6",
            "   2 6     5 4 ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 72",
        "diff": "original",
        "players": "default",
        "board": [
            "      6 6      ",
            "     5 5 4     ",
            "    1 6 6 4    ",
            "   1 7 2 5 3   ",
            "  2 7 2 1 5 3  ",
            " 2 1 3 1 4 2 7 ",
            "  3 1 3 4 2 7  ",
            "   3 5 5 6 6   ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 73",
        "diff": "original",
        "players": "default",
        "board": [
            "    7 3        ",
            "   1 7 6       ",
            "  3 7 5 1 5    ",
            " 7 7 0 2 4 0 4 ",
            "7 1 4 6 5 6 5 7",
            " 1 7 7 1 7 7 1 ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 74",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "    1     1    ",
            "   5 6 1 5 6   ",
            "  1 1 2 2 1 1  ",
            " 4 7 1 0 1 7 4 ",
            "  3 7 5 7 5 3  ",
            "   1 1 1 1 1   ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 75",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "4       5     4",
            " 6 6 7 6   4 5 ",
            "4 2 7 5 2 2 6 4",
            "     4 1   5 2 ",
            "  5 2 7 7   7 4",
            " 4 6 5 4   4 2 ",
            "      4   4 1  ",
            " 0 0 0 5       ",
            "        0 0 0 0",
            "               "
        ]
    },
    {
        "name": "Level 76",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "1       0 0    ",
            " 2     0 1 0   ",
            "3     0 2 2 0  ",
            " 4   0 1 1 1 0 ",
            "5     0 4 4 0  ",
            " 6     4 4 4   ",
            "7       4 4    ",
            "       0 1 0   ",
            "      0 1 1 0  ",
            "               "
        ]
    },
    {
        "name": "Level 77",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "    3     1 7  ",
            "   7 4     4 3 ",
            "1     0 2 0    ",
            " 5 4   3       ",
            "4   3 6 1 1 6  ",
            "   1     4   1 ",
            "  7 5       3  ",
            "     3         ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 78",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "1       1      ",
            " 2       2     ",
            "  3     3 3    ",
            "   4   4   4   ",
            "  5     5 5    ",
            " 6     7 1 7   ",
            "7       6 6    ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 79",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "2     6   2 5 1",
            " 5   4   4   4 ",
            "6     3       3",
            " 4 2 0       5 ",
            "      6   3 6  ",
            "     5   5     ",
            "      3   4 2 5",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 80",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "6       4     3",
            " 0 3     6   0 ",
            "    7   1   3  ",
            " 7   4 7   2   ",
            "5 2 3 2 1 6   3",
            "     0 4 3 5 4 ",
            "  7 6     0    ",
            " 4 3       4 2 ",
            "0           6  ",
            "               "
        ]
    },
    {
        "name": "Level 81",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "6 1 2 5 1 6 3 0",
            "             4 ",
            "0 5 2 7 1 6 2  ",
            " 3             ",
            "6 7 6 4 0 5 2 6",
            "             1 ",
            "6 1 4 0 6 2 3  ",
            " 0             ",
            "  0 4 5 3 7 6 0",
            "               "
        ]
    },
    {
        "name": "Level 82",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "      0 1      ",
            "     0 7 0     ",
            "    1 2 2 0    ",
            "   0 7 0 7 0   ",
            "  6   7 7   6  ",
            " 4 1 6 6 6 4 1 ",
            "  5   7 7   5  ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 83",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "      5 6      ",
            "     3 3 3     ",
            "    7 5 3 7    ",
            "   3   6   3   ",
            "2     3 7     1",
            " 2 2   3   1 1 ",
            "  0 2 5 6 1 0  ",
            "       3       ",
            "      3 7      ",
            "               "
        ]
    },
    {
        "name": "Level 84",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "  6         2  ",
            "   2 6 0 6 0   ",
            "  0            ",
            " 6             ",
            "  3 3 2 0 6 0 0",
            "   6         0 ",
            "      6 0 2 6  ",
            "   2 0         ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 85",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "0 7            ",
            " 1 5           ",
            "7 2 5          ",
            " 6 3 4         ",
            "5 5 4 4        ",
            " 3 3 5 3       ",
            "1 2 2 5 3      ",
            " 1 0 0 7 6     ",
            "3 3 5 5 7 6    ",
            "               "
        ]
    },
    {
        "name": "Level 86",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "    2 6 6 2    ",
            "   2 1 1 0 2   ",
            "  2 3 2 2 0 2  ",
            " 2 3 2 5 2 7 2 ",
            "2 4 2 5 2 7 2 0",
            " 2 4 2 6 6 2 0 ",
            "  2 5 2 2 2 7 2",
            "   2 5 6 6 7 2 ",
            "    2 2 2 2 2  ",
            "               "
        ]
    },
    {
        "name": "Level 87",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "    0     0    ",
            " 1 0 0 1 0 0 1 ",
            "1 7 7 5 5 7 7 1",
            " 3 2   2   2 3 ",
            "3 7   6 6   7 3",
            " 7     6     7 ",
            "4 4 5     5 4 4",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 88",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "  6 3     3 6  ",
            " 6   2   2   6 ",
            "2   0 1 1 0   2",
            " 5 0   7   0 5 ",
            "  5   6 6   5  ",
            " 7 1 4   4 1 7 ",
            "7   4     4   7",
            " 2 0       0 2 ",
            "  2         2  ",
            "               "
        ]
    },
    {
        "name": "Level 89",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "6 1         4 0",
            " 2 7 5 5 5 7 3 ",
            "6 1         4 0",
            " 2 5 7 7 7 5 3 ",
            "6 1         4 0",
            " 2 0 6 6 6 0 3 ",
            "6 1         4 0",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 90",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "5     1 1     5",
            " 5   4   4   5 ",
            "  2 4     4 2  ",
            " 7 2       2 7 ",
            "0   0 4 4 0   0",
            " 7 2       2 7 ",
            "  2 3     3 2  ",
            " 5   3   3   5 ",
            "5     6 6     5",
            "               "
        ]
    },
    {
        "name": "Level 91",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "2 2         5 5",
            " 5           2 ",
            "5             2",
            " 1   1 5 1   3 ",
            "5 2 5 3 1 2 5 2",
            " 2 0 5   2 0 5 ",
            "  3 7     3 7  ",
            "     2 0 5     ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 92",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "0 6 5 2 3 4 1 7",
            "         1     ",
            "      1 1      ",
            "     1         ",
            "7 1 4 3 2 5 6 0",
            "         1     ",
            "      1 1      ",
            "     1         ",
            "0 6 5 2 3 4 1 7",
            "               "
        ]
    },
    {
        "name": "Level 93",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "    1     1    ",
            "   2 4   2 4   ",
            "  2 3 6 5 3 2  ",
            "   6 5   6 5   ",
            "      7 7      ",
            "       7       ",
            "1     7 7     3",
            " 2     7     2 ",
            "  3 4 5 6 4 1  ",
            "               "
        ]
    },
    {
        "name": "Level 94",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "1     2 2     2",
            " 1 3 7 3 7 4 2 ",
            "  1 6     6 2  ",
            " 6   7 3 7   6 ",
            "  4 2     1 3  ",
            "     2 6 1     ",
            "  4 3 3 4 4 3  ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 95",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "      5 6      ",
            "       3       ",
            "      1 2      ",
            "       4       ",
            "      5 7      ",
            "       2       ",
            "6 5 4 3 2 1 7 5",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 96",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "  0   1   2    ",
            "   4   5   6   ",
            "  7   0   2    ",
            "   6   3   6   ",
            "  1   1   2    ",
            "   3   5   0   ",
            "  2   4   6    ",
            "   3   6   7   ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 97",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "1 1 2 2 3 3 4 4",
            " 5 5 6 7 6 5 5 ",
            "6 4 3 3 2 2 1 6",
            " 4 6 5 7 6 3 1 ",
            "               ",
            "               ",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 98",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "7 4   1 2   4 7",
            " 5 5   2   4 4 ",
            "  5   7 7   4  ",
            " 1 0 6 7 6 0 2 ",
            "  2   5 3   1  ",
            " 1 1       2 2 ",
            "6 1 4     4 2 6",
            " 5 3       3 5 ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 99",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "1 5 1 0 0 1 5 1",
            " 1 2 5   5 2 1 ",
            "3 6 1 2 2 1 6 3",
            " 4 3 4   4 3 4 ",
            "3 4 6 5 5 6 4 3",
            " 0 2 3   3 2 0 ",
            "2 3 1 5 5 1 3 2",
            "               ",
            "               ",
            "               "
        ]
    },
    {
        "name": "Level 100",
        "diff": "original",
        "author": "Frozen Bubble",
        "players": "default",
        "board": [
            "3 0 2 7 5 7 6 5",
            " 6   1   2   1 ",
            "  6 4 0 3 4 5  ",
            "   5   1   4   ",
            "  7 3 5 6 5 3  ",
            " 1   2   4   2 ",
            "6 4 4 6 6 5 5 1",
            "               ",
            "               ",
            "               ",
            "               "
        ]
    }
];

(function() {
    const levelNames = {};

    for(let level of LEVELS) {
        if(level.name in levelNames)
            throw "Duplicated level name!";
        levelNames[level.name] = true;

        if(level.players == 'default') {
            level.players = [{x: 160, y: 500}];
        }
    }
})();