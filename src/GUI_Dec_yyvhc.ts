class GUI_Dec_yyvhc extends GUI_15001 {
  /**
   * 解谜模块位置
   */
  static PLUGIN_MODULE_TYPE_Dec_yyvhc: number = 2

  /***
     * 当前解谜界面
     */
  static PLUGIN_GUI_MONSTER_Dec_yyvhc: number = 15001

  /**
   * 当前拖拽线索
   */
  static moveDec: UIButton | undefined

  /**
   * 当前拖入线索
   */
  static dragInDec: { [index: number]: UIButton } = {}

  /**
   * 当前缓动
   */
  static cuTween: Tween | undefined

  /**
   * 当前dec集合
   */
  static decs: any[] = []

  /**
   * 构造函数
   */
  constructor() {
    super()
    // 事件监听：当界面显示时
    this.on(EventObject.DISPLAY, this, this.onDisplay)
    // 如果已存在dec，则全部清除，以免读档时报错
    if (GUI_Dec_yyvhc.decs.length > 0)
      GUI_Dec_yyvhc.decs.forEach(v => v.dispose())

    GUI_Dec_yyvhc.moveDec = undefined
    GUI_Dec_yyvhc.dragInDec = {}
    GUI_Dec_yyvhc.decs = []
    GUI_Dec_yyvhc.cuTween = undefined
    // 获得所有dec
    for (let i = 1; i < 100; i++) {
      // @ts-ignore 忽略处理
      if (this[`dec${i}`])
        // @ts-ignore 忽略处理
        GUI_Dec_yyvhc.decs.push(this[`dec${i}`])
    }

    const dec = GUI_Dec_yyvhc.decs
    dec.forEach((v, i) => {
      v['img1'] = v.image1
      v['img2'] = v.image2
      v['img3'] = v.image3
    })
    // 添加拖拽事件
    for (let i = 0; i < this.dec.numChildren; i++) {
      let f, f1: any, f2: any, f3: any
      const deci = this.dec.getChildAt(i) as UIButton
      // @ts-ignore 忽略处理
      deci['o_Pos'] = new Point(deci.x, deci.y)
      // 获得数据库数据
      deci.data = GameData.getModuleData(GUI_Dec_yyvhc.PLUGIN_MODULE_TYPE_Dec_yyvhc, Number(deci.name.split('线索')[1])) as Module_dec_yyvhc
      if (deci.data)
        deci.label = deci.data.textName
      // 鼠标点击
      deci.on(EventObject.MOUSE_DOWN, this, f = () => {
        if (GUI_Dec_yyvhc.moveDec)
          return
        GUI_Dec_yyvhc.moveDec = deci
        this.addChild(GUI_Dec_yyvhc.moveDec)
        GUI_Dec_yyvhc.moveDec.x = this.mouseX - deci.width / 2
        GUI_Dec_yyvhc.moveDec.y = this.mouseY - deci.height / 2
        GUI_Dec_yyvhc.moveDec.startDrag()
        GUI_Dec_yyvhc.moveDec.on(EventObject.MOUSE_UP, this, f1 = () => {
          // @ts-ignore 忽略处理
          GUI_Dec_yyvhc.moveDec.off(EventObject.MOUSE_UP, this, f1)
          // @ts-ignore 忽略处理
          GUI_Dec_yyvhc.moveDec.off(EventObject.DRAG_END, this, f2)
          // @ts-ignore 忽略处理
          GUI_Dec_yyvhc.moveDec.off(EventObject.MOUSE_MOVE, this, f3)
          let isP = false
          dec.forEach((v, z) => {
            if (v.hitTestPoint(this.mouseX, this.mouseY)) {
              isP = true
              if (GUI_Dec_yyvhc.dragInDec[z] && GUI_Dec_yyvhc.dragInDec[z] !== GUI_Dec_yyvhc.moveDec)
                this.goHuan(GUI_Dec_yyvhc.dragInDec[z])

              // @ts-ignore 忽略处理
              GUI_Dec_yyvhc.dragInDec[z] = null
              // @ts-ignore 忽略处理
              GUI_Dec_yyvhc.dragInDec[z] = GUI_Dec_yyvhc.moveDec
              // @ts-ignore 忽略处理
              GUI_Dec_yyvhc.moveDec.x = v.x + (v.width - GUI_Dec_yyvhc.moveDec.width) / 2
              // @ts-ignore 忽略处理
              GUI_Dec_yyvhc.moveDec.y = v.y + (v.height - GUI_Dec_yyvhc.moveDec.height) / 2
            }
            else if (GUI_Dec_yyvhc.dragInDec[z] === GUI_Dec_yyvhc.moveDec) {
              delete GUI_Dec_yyvhc.dragInDec[z]
            }
          })
          if (!isP) {
            for (const s in GUI_Dec_yyvhc.dragInDec) {
              if (GUI_Dec_yyvhc.dragInDec[s] === GUI_Dec_yyvhc.moveDec)
                delete GUI_Dec_yyvhc.dragInDec[s]
            }
            // @ts-ignore 忽略处理
            this.goHuan(GUI_Dec_yyvhc.moveDec)
          }
          GUI_Dec_yyvhc.moveDec = undefined
          this.changeC()
        })
        GUI_Dec_yyvhc.moveDec.on(EventObject.MOUSE_MOVE, this, f3 = () => {
          this.changeC()
          dec.forEach((v, z) => {
            if (v.hitTestPoint(this.mouseX, this.mouseY))
              v.image1 = v['img2']
          })
        })
        GUI_Dec_yyvhc.moveDec.on(EventObject.DRAG_END, this, f2 = () => {
          // @ts-ignore 忽略处理
          GUI_Dec_yyvhc.moveDec.off(EventObject.MOUSE_UP, this, f1)
          // @ts-ignore 忽略处理
          GUI_Dec_yyvhc.moveDec.off(EventObject.DRAG_END, this, f2)
          // @ts-ignore 忽略处理
          GUI_Dec_yyvhc.moveDec.off(EventObject.MOUSE_MOVE, this, f3)
          // @ts-ignore 忽略处理
          this.goHuan(GUI_Dec_yyvhc.moveDec)
          GUI_Dec_yyvhc.moveDec = undefined
        })
      })
    }

    // 点击按钮
    this.button.on(EventObject.CLICK, this, () => {
      // 获得当前关卡值
      const gn = WorldData.index_yyvhc
      // 获得当前关卡线索集合
      const iss = WorldData.IDS_yyvhc[gn]
      // 获得正确线索
      const _qiss: number[] = []
      const __qiss: number[] = []
      for (const s in GUI_Dec_yyvhc.dragInDec) {
        _qiss.push(GUI_Dec_yyvhc.dragInDec[s].data ? GUI_Dec_yyvhc.dragInDec[s].data.id : null)
        __qiss.push(GUI_Dec_yyvhc.dragInDec[s].data ? GUI_Dec_yyvhc.dragInDec[s].data.textNum : null)
      }
      const typen = iss.decNumBoo
      const typen_2 = iss.decNumBoo_2
      let num = 0
      if (typen) {
        __qiss.forEach(((v) => {
          num += v
        }))
      }
      else {
        if (typen_2 === 0) {
          // 常规模式
          const qiss = iss.decC.split(',')
          // 顺序判断
          if (iss.decClues && qiss.toString() === _qiss.toString())
            num = 1
          else if (!iss.decClues && qiss.sort().toString() === _qiss.sort().toString())
            num = 1
          else num = 0
        }
        if (typen_2 === 1) {
          // 集合模式
          __qiss.forEach(((v) => {
            num += v
          }))
        }
        if (typen_2 === 2) {
          // 多答案
          const qissArr = iss.decC.split('|')
          for (let i = 0; i < qissArr.length; i++) {
            const qiss = qissArr[i].split(',')
            // 顺序判断
            if (iss.decClues && qiss.toString() === _qiss.toString()) {
              num = i + 1
              break
            }
            else if (!iss.decClues && qiss.sort().toString() === _qiss.sort().toString()) {
              num = i + 1
              break
            }
            else { num = 0 }
          }
        }
      }
      Game.player.variable.setVariable(iss.decnum, num)
      CommandPage.startTriggerFragmentEvent(WorldData.decEvent, Game.player.sceneObject, Game.player.sceneObject)
    })
  }

  // ------------------------------------------------------------------------------------------------------
  // 显示事件
  // ------------------------------------------------------------------------------------------------------
  /**
   * 当界面显示时事件
   */
  private onDisplay() {
    // 获得当前关卡值
    const gn = WorldData.index_yyvhc
    // 获得当前关卡线索集合
    const iss = WorldData.IDS_yyvhc[gn]
    // 获得当前关卡拥有线索
    const ids: string[] = iss.decIndex.split(',')
    // 获得玩家获取的线索
    const gets = WorldData.objGet_yyvhc
    // 获得线索名字
    const names = ids.map((v) => {
      return `线索${v}`
    })
    const showDec: UIButton[] = []
    for (let i = 0; i < this.dec.numChildren; i++) {
      const deci = this.dec.getChildAt(i) as UIButton
      if (names.some((v) => {
        return v === deci.name
      }) && gets.some((v) => {
        return `线索${v}` === deci.name
      })) {
        deci.visible = true
        showDec.push(deci)
      }
      else { deci.visible = false }
    }
    if (!showDec[0])
      // eslint-disable-next-line no-useless-return
      return
  }

  /**
   * 改变颜色
   */
  changeC() {
    const dec = GUI_Dec_yyvhc.decs
    dec.forEach((v, i) => {
      if (GUI_Dec_yyvhc.dragInDec[i])
        v.image1 = v['img3']
      else v.image1 = v['img1']
    })
  }

  /**
   * 进行还原
   */
  goHuan(button: UIButton, isZ: boolean = false) {
    if (GUI_Dec_yyvhc.cuTween) {
      GUI_Dec_yyvhc.cuTween.complete()
      GUI_Dec_yyvhc.cuTween.clear()
    }
    GUI_Dec_yyvhc.cuTween = Tween.to(button, {
      // @ts-ignore 忽略处理
      x: button['o_Pos'].x, y: button['o_Pos'].y,
    }, isZ ? 0 : 100, undefined, Callback.New(() => {
      this.dec.addChild(button)
    }, this))
  }
}
