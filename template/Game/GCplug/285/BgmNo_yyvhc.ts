module CommandExecute {
    /**
     * 自定义命令执行
     * @param commandPage 事件页
     * @param cmd 当前的事件命令
     * @param trigger 触发器
     * @param triggerPlayer 触发器对应的玩家
     * @param playerInput 玩家输入值，用于暂停执行该触发器事件并等待玩家输入后获得的值，执行完该函数后会被清空
     * @param p 自定义命令参数
     */
    export function customCommand_15003(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_15003): void {

        let bgm = GameAudio

        if (p.bgmall_yyvhc == true) {

            if (p.bgmno_yyvhc == 0) {
                bgm.bgmVolume = 0
                bgm.bgsVolume = 0
                bgm.seVolume = 0
                bgm.tsVolume = 0
            }
            if (p.bgmno_yyvhc == 1) {
                bgm.bgmVolume = 1
                bgm.bgsVolume = 1
                bgm.seVolume = 1
                bgm.tsVolume = 1
            }

        } else {

            if (p.bgmVolume_yyvhc == 0) {
                bgm.bgmVolume = 0
            }
            if (p.bgsVolume_yyvhc == 0) {
                bgm.bgsVolume = 0
            }
            if (p.seVolume_yyvhc == 0) {
                bgm.seVolume = 0
            }
            if (p.tsVolume_yyvhc == 0) {
                bgm.tsVolume = 0
            }

            if (p.bgmVolume_yyvhc == 1) {
                bgm.bgmVolume = 1
            }
            if (p.bgsVolume_yyvhc == 1) {
                bgm.bgsVolume = 1
            }
            if (p.seVolume_yyvhc == 1) {
                bgm.seVolume = 1
            }
            if (p.tsVolume_yyvhc == 1) {
                bgm.tsVolume = 1
            }


        }


    }


    }

