module OpenAPI {

  /**
   * 解谜系统
   */
  export class Dec {
    /**
     * 当前版本号
     */
    static Version = 3.0

    /**
     * 是否安装本插件
     */
    static Installed = true
  }
}
module CommandExecute {
  export function customCommand_15001(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_15001): void {
    let id: any
    if (p.decVar === 0)
      id = p.dec.toString()

    else if (p.decVar === 1)
      id = Game.player.variable.getVariable(p.decV).toString()

    else if (p.decVar === 2)
      id = p.decV2.toString()

    if (!WorldData.objGet_yyvhc.some((v) => {
      return v === id
    }))
      WorldData.objGet_yyvhc.push(id)
  }
  export function customCommand_15002(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_15002): void {
    const c = (p.decVar === 0 ? p.dec : Game.player.variable.getVariable(p.decV))
    if (c === WorldData.index_yyvhc)
      return
    WorldData.index_yyvhc = c
    const ui = GameUI.load(GUI_Dec_yyvhc.PLUGIN_GUI_MONSTER_Dec_yyvhc) as GUI_Dec_yyvhc
    for (const n in GUI_Dec_yyvhc.dragInDec) {
      ui.goHuan(GUI_Dec_yyvhc.dragInDec[n], true)
      GUI_Dec_yyvhc.dragInDec[n].visible = false
    }
    GUI_Dec_yyvhc.dragInDec = {}
    ui.changeC()
  }
}
class GUI_DecText_yyvhc extends GUI_15002 {
  /**
   * 解谜模块位置
   */
  static PLUGIN_MODULE_TYPE_DecText_yyvhc: number = 2

  /**
   * 构造函数
   */
  constructor() {
    super()
    // 标准化
    GUI_DecText_yyvhc.standardList(this.list)
    // 事件监听：当界面显示时
    this.on(EventObject.DISPLAY, this, this.onDisplay)
    // 监听：选中焦点改变事件
    this.list.on(EventObject.CHANGE, this, this.refreshInfo)
  }

  /**
   * 标准化列表LIST
   * -- 键位滚动至可见区域
   */
  static standardList(list: UIList, useItemClickSe: boolean = true): void {
    list.on(EventObject.CHANGE, this, (list: UIList, state: number) => {
      if (state === 0)
        list.scrollTo(list.selectedIndex, true, true, 300, Ease.strongOut)
    }, [list])
    if (useItemClickSe) {
      list.on(UIList.ITEM_CLICK, this, (list: UIList) => {
        GameAudio.playSE(ClientWorld.data.sureSE)
      }, [list])
    }
  }

  // ------------------------------------------------------------------------------------------------------
  // 显示事件
  // ------------------------------------------------------------------------------------------------------
  /**
   * 当界面显示时事件
   */
  private onDisplay() {
    UIList.focus = this.list
    // 获得当前关卡值
    const gn = WorldData.index_yyvhc
    // 获得当前关卡线索集合
    const isIndexs = WorldData.IDS_yyvhc[gn].decIndex.split(',')
    const max = WorldData.objGet_yyvhc.length
    WorldData.objGet_yyvhc = WorldData.objGet_yyvhc.sort()
    const arr = []
    this.list.onCreateItem = Callback.New((ui: GUI_15003, d: ListItem_15003, i: number) => {
      const dec = ui.dec
      if (!d.data)
        return
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const but = GameUI.load(GUI_Dec_yyvhc.PLUGIN_GUI_MONSTER_Dec_yyvhc)[`线索${d.data.id}`]
      dec.label = but.label
      dec.image1 = but.image1
      dec.grid9img1 = but.grid9img1
      dec.image2 = but.image2
      dec.grid9img2 = but.grid9img2
      dec.image3 = but.image3
      dec.grid9img3 = but.grid9img3
      dec.align = but.align
      dec.valign = but.valign
      dec.bold = but.bold
      dec.font = but.font
      dec.color = but.color
      dec.overColor = but.overColor
      dec.smooth = but.smooth
      dec.italic = but.italic
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dec.letterSpacing = but.letterSpacing
      dec.clickColor = but.clickColor
      dec.fontSize = but.fontSize
      dec.textDx = but.textDx
      dec.textDy = but.textDy
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dec.textStroke = but.textStroke
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dec.textStrokeColor = but.textStrokeColor
    }, this)
    for (let i = 0; i < max; i++) {
      const decTextID = Number(WorldData.objGet_yyvhc[i])
      if (!isIndexs.some((v) => {
        return Number(v) === decTextID
      }))
        continue
      // 获取值
      const decTextData: Module_dec_yyvhc = GameData.getModuleData(GUI_DecText_yyvhc.PLUGIN_MODULE_TYPE_DecText_yyvhc, decTextID)
      trace(decTextData)
      // 创建项数据，该项数据的类由系统自动生成
      const d = new ListItem_15003()
      d.data = decTextData
      arr.push(d)
    }
    this.list.items = arr
  }

  /**
   * 显示
   */
  private refreshInfo() {
    const itme = this.list.selectedItem
    if (!itme || !itme.data)
      return
    this.textName.text = itme.data.textName
    this.textC.text = itme.data.textC
  }
}
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (this[`dec${i}`])
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          GUI_Dec_yyvhc.moveDec.off(EventObject.MOUSE_UP, this, f1)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          GUI_Dec_yyvhc.moveDec.off(EventObject.DRAG_END, this, f2)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          GUI_Dec_yyvhc.moveDec.off(EventObject.MOUSE_MOVE, this, f3)
          let isP = false
          dec.forEach((v, z) => {
            if (v.hitTestPoint(this.mouseX, this.mouseY)) {
              isP = true
              if (GUI_Dec_yyvhc.dragInDec[z] && GUI_Dec_yyvhc.dragInDec[z] !== GUI_Dec_yyvhc.moveDec)
                this.goHuan(GUI_Dec_yyvhc.dragInDec[z])

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              GUI_Dec_yyvhc.dragInDec[z] = null
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              GUI_Dec_yyvhc.dragInDec[z] = GUI_Dec_yyvhc.moveDec
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              GUI_Dec_yyvhc.moveDec.x = v.x + (v.width - GUI_Dec_yyvhc.moveDec.width) / 2
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          GUI_Dec_yyvhc.moveDec.off(EventObject.MOUSE_UP, this, f1)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          GUI_Dec_yyvhc.moveDec.off(EventObject.DRAG_END, this, f2)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          GUI_Dec_yyvhc.moveDec.off(EventObject.MOUSE_MOVE, this, f3)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.goHuan(GUI_Dec_yyvhc.moveDec)
          GUI_Dec_yyvhc.moveDec = undefined
        })
      })
    }

    // 点击按钮
    this.button.on(EventObject.MOUSE_OVER, this, () => {
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      x: button['o_Pos'].x, y: button['o_Pos'].y,
    }, isZ ? 0 : 100, undefined, Callback.New(() => {
      this.dec.addChild(button)
    }, this))
  }
}
