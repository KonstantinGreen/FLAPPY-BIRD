class Config {
    gravity = 300
    speedGame = 3.5

    recordForBronze = 5
    recordForSilver = 10
    recordForGold = 15
    recordForPlatinum = 20

    canvas = {
        canvasId: 'canvas',
        restartBtnId: 'restart',
        width: 480,
        height: 480,
    }

    spritesheet = {
        width: 606,
        height: 428,
        src: 'app/assets/spritesheet.png'
    }

    bg = {
        x: 0,
        y: 0,
        width: this.canvas.width,
        height: this.canvas.height,
        frames: [
            {
                x: 0,
                y: 0,
                w: 276,
                h: 228,
            }
        ]
    }

    ground = {
        x: 0,
        y: 450,
        width: this.canvas.width,
        height: 110,
        frames: [
            {
                x: 276,
                y: 2,
                w: 224,
                h: 110,
            }
        ]
    }

    bird = {
        x: 50,
        y: 200,
        width: 34,
        height: 26,

        flapSpeed: 150,
        
        frames:  [
            {
                x: 276,
                y: 112,
                w: 34,
                h: 26,
            },
            {
                x: 276,
                y: 139,
                w: 34,
                h: 26,
            },
            {
                x: 276,
                y: 164,
                w: 34,
                h: 26,
            },
            {
                x: 276,
                y: 139,
                w: 34,
                h: 26,
            },
        ]
    }

    spaceTube = this.bird.height * 4

    tubes = {
        x: this.canvas.width,
        y: 0,
        width: 68,
        height: 400,
        frames: [
            {
                x: 503,
                y: 1,
                w: 52,
                h: 400,
            },
            {
                x: 556,
                y: 1,
                w: 52,
                h: 400,
            }
        ],
    }

    interfaces = {
        gameOverWords: {
            x: this.canvas.width / 2 - 260 / 2,
            y: this.canvas.height / 2 - 39 / 0.5,
            width: 260,
            height: 39,
            frames: [
                {
                    x: 193,
                    y: 228,
                    w: 189,
                    h: 39,
                }
            ],
        },

        startWords: {
            x: this.canvas.width / 2 - 174 / 2,
            y: this.canvas.height / 2 - 45 / 0.5,
            width: 200,
            height: 45,
            frames: [
                {
                    x: 0,
                    y: 228,
                    w: 174,
                    h: 45,
                }
            ],
        },

        tapImg: {
            x: this.canvas.width / 2 - 114 / 2,
            y: this.canvas.height / 2 - 100 / 4,
            width: 130,
            height: 115,
            frames: [
                {
                    x: 30,
                    y: 281,
                    w: 114,
                    h: 100,
                }
            ],
        },

        gameOverDesk: {
            x: this.canvas.width / 2 - 320 / 2,
            y: this.canvas.height / 2 - 117 / 4,
            width: 320,
            height: 160,
            frames: [
                {
                    x: 174,
                    y: 272,
                    w: 227,
                    h: 117,
                }
            ],
            scoresX: 330,
            scoresY: 275,

            recordX: 330,
            recordY: 330,

            medals: {
                x: 115,
                y: 265,
                w: 62,
                h: 61,
                frames: [
                    {
                        x: 312,
                        y: 112,
                        w: 45,
                        h: 44,
                    },
                    {
                        x: 312,
                        y: 158,
                        w: 45,
                        h: 44,
                    },
                    {
                        x: 359,
                        y: 112,
                        w: 45,
                        h: 44,
                    },
                    {
                        x: 359,
                        y: 158,
                        w: 45,
                        h: 44,
                    },
                ]
            }
        },
    }
}