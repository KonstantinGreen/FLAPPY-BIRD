class Canvas {
    constructor() {
        this._config = new Config()

        this._canvasListener = null

        this._canvas = document.getElementById(this._config.canvas.canvasId)
        this._restartBtn = document.getElementById(this._config.canvas.restartBtnId)
        this._canvas.width = this._config.canvas.width
        this._canvas.height = this._config.canvas.height

        this.height = this._config.canvas.height
        this.width = this._config.canvas.width

		this._score = 0
        this._record = !localStorage.getItem('record') ? 0 : localStorage.getItem('record')

        this._drawEngine = new CanvasDrawEngine({canvas: this._canvas})
        this._physicsEngine = new PhysicsEngine({gravity: this._config.gravity})
        this._resourceLoader = new ResourceLoader()
        this._inputHandler = new MouseInputHandler({
            left: () => {
                this._bird.flap()
                this.status = 'start'
            }
        })
    }

    async prepare() {
        this._spriteSheet = this._resourceLoader.load({
            type: RESOURCE_TYPE.IMAGE,
            src: this._config.spritesheet.src,
            width: this._config.spritesheet.width,
            height: this._config.spritesheet.height,
        })
    }

    reset() {
        this._score = 0
        
        this._bg = new Bg({
            x: this._config.bg.x,
            y: this._config.bg.y,
            width: this._config.bg.width,
            height: this._config.bg.height,
            frames: this._config.bg.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            canvas: this
        })
        this._bird = new Bird({
            x: this._config.bird.x,
            y: this._config.bird.y,
            width: this._config.bird.width,
            height: this._config.bird.height,
            frames: this._config.bird.frames,
            spriteSheet: this._spriteSheet,
            flapSpeed: this._config.bird.flapSpeed,
            physicsEngine:this._physicsEngine,
            drawEngine: this._drawEngine,
            canvas: this
        })
        this._ground = new Ground({
            x: this._config.ground.x,
            y: this._config.ground.y,
            width: this._config.ground.width,
            height: this._config.ground.height,
            frames: this._config.ground.frames,
            spriteSheet: this._spriteSheet,
            speedGame: this._config.speedGame,
            drawEngine: this._drawEngine,
            canvas: this
        })

        this._tubes = new Tubes({
            x: this._config.tubes.x,
            y: this._config.tubes.y,
            width: this._config.tubes.width,
            height: this._config.tubes.height,
            frames: this._config.tubes.frames,
            spriteSheet: this._spriteSheet,
            speedGame: this._config.speedGame,
            drawEngine: this._drawEngine,
            canvas: this,
            spaceTube: this._config.spaceTube,
            index: 0
        })

        this._gameOverWords = new GameOverWords({
            x: this._config.interfaces.gameOverWords.x,
            y: this._config.interfaces.gameOverWords.y,
            width: this._config.interfaces.gameOverWords.width,
            height: this._config.interfaces.gameOverWords.height,
            frames: this._config.interfaces.gameOverWords.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            canvas: this,
        })

        this._startWords = new StartWords({
            x: this._config.interfaces.startWords.x,
            y: this._config.interfaces.startWords.y,
            width: this._config.interfaces.startWords.width,
            height: this._config.interfaces.startWords.height,
            frames: this._config.interfaces.startWords.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            canvas: this,
        })

        this._tapImg = new TapImg({
            x: this._config.interfaces.tapImg.x,
            y: this._config.interfaces.tapImg.y,
            width: this._config.interfaces.tapImg.width,
            height: this._config.interfaces.tapImg.height,
            frames: this._config.interfaces.tapImg.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            canvas: this,
        })

        this._gameOverDesk = new GameOverDesk({
            x: this._config.interfaces.gameOverDesk.x,
            y: this._config.interfaces.gameOverDesk.y,
            width: this._config.interfaces.gameOverDesk.width,
            height: this._config.interfaces.gameOverDesk.height,
            frames: this._config.interfaces.gameOverDesk.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            canvas: this,

            scoresX: this._config.interfaces.gameOverDesk.scoresX,
            scoresY: this._config.interfaces.gameOverDesk.scoresY,

            recordX: this._config.interfaces.gameOverDesk.recordX,
            recordY: this._config.interfaces.gameOverDesk.recordY,

            medalX: this._config.interfaces.gameOverDesk.medals.x,
            medalY: this._config.interfaces.gameOverDesk.medals.y,
            medalW: this._config.interfaces.gameOverDesk.medals.w,
            medalH: this._config.interfaces.gameOverDesk.medals.h,
            medalFrames: this._config.interfaces.gameOverDesk.medals.frames,

            recordForBronze: this._config.recordForBronze,
            recordForSilver: this._config.recordForSilver,
            recordForGold: this._config.recordForGold,
            recordForPlatinum: this._config.recordForPlatinum
        })
    }

    update(delta) {
        this._bird.update(delta)
        this._tubes.update(delta)
    }

    draw() {
        this._bg.draw()
        this._bird.draw()
        this._ground.draw()
        this._tubes.draw()
    }

    _loop() {
        const now = Date.now()
        const delta =  now - this._lastUpdate

        const tubesX1 = this._tubes.x + (this._tubes.width / 2)
        this.update(delta / 1000)
        const tubesX2 = this._tubes.x + (this._tubes.width / 2)

        const deltaTubesX = tubesX1 - tubesX2
        this.updateCounter(deltaTubesX)
        
        if(this._playing) {
            this._drawEngine.clear()
            this.draw()
            
            this._lastUpdate = now

            requestAnimationFrame(this._loop.bind(this))
        }
        
    }

    createCounter() {
        this._counter = document.getElementById('counter')
        this._counter.innerText = `${this._score}`
        this._counter.style.display = 'block'
    }
    
    updateCounter(deltaTubesX) {
        const range = deltaTubesX / 2
        
        const conditionForIncrease = 
        (this._bird.x + (this._bird.width / 2) - range) < this._tubes.x + (this._tubes.width / 2) 
        && 
        (this._bird.x + (this._bird.width / 2) + range) > this._tubes.x + (this._tubes.width / 2);
        
        if(conditionForIncrease) {
            ++this._score
            this._counter.innerText = `${this._score}`
        }
    }

    start() {
        this._canvas.removeEventListener('click', this._canvasListener)
        this._playing = true
        this._inputHandler.subscribe()
        this._lastUpdate = Date.now()
        
        this.createCounter()
        this._loop()
    }

    gameOver() {
        this._drawEngine.clear()


        if(this._score > this._record) {
            localStorage.setItem('record', this._score)
        }
        
        this._bg.draw()
        this._gameOverWords.draw()
        this._gameOverDesk.draw()

        this._restartBtn.style.display = 'block'
        this._counter.style.display = 'none'
        this._restartBtn.addEventListener('click', (event) => {
            location.reload()
            this._restartBtn.style.display = 'none'
            
        })

        this._playing = false
    }

    preview() {
        this.reset()

        this._bg.draw()
        this._startWords.draw()
        this._tapImg.draw()
        
        this._canvasListener = (event) => {
            this.start()
        }

        this._canvas.addEventListener('click', this._canvasListener)
    }
}