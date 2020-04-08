import { VueConstructor } from 'vue'
import { IOSOptions } from '@helper/interface'
import VIosAlertView from './iosView'

const defer: Function = () => {
    let promise: Promise<any>,
        resolve: any,
        reject: any
  
    promise = new Promise((_resolve_: any, _reject_: any) => {
        resolve = _resolve_
        reject = _reject_
    })
  
    return {
        promise: promise,
        resolve: resolve,
        reject: reject
    }
}

const VueIOSAlert: any = {
    install: (Vue: VueConstructor, options?: IOSOptions) => {
        let defaults: any = {
            defaultOption: 'title',
            title: null,
            text: null,
            input: false,
            placeholder: '',
            cancelText: 'Cancel',
            okText: 'OK',
            remindDuration: 650
        }

        let globalOptions: IOSOptions = Object.assign(defaults, options)

        if (typeof globalOptions !== 'object') {
            throw new Error('Expect Object options')
        }

        const getPropsData: Function = (options: any = {}) => {
            let propsData: any = Object.assign({}, globalOptions)
        
            if (typeof options === 'string') {
              propsData[globalOptions.defaultOption] = options
            } else {
              propsData = Object.assign(propsData, options)
            }
        
            return propsData
        }
        
        const IosAlertView: Function = (options: any) => {
            const propsData: any = getPropsData(options);
            const instance: any = new VIosAlertView({
                propsData: propsData
            })
        
            const mount: HTMLDivElement = document.createElement('div')
            mount.id = 'ios-alert-' + Date.now()
            document.body.appendChild(mount)
        
            instance.$mount(mount)
        
            return instance.activate()
        }
        
        Vue.prototype.$iosAlertView = IosAlertView
        
        Vue.prototype.$iosAlert = (options: any) => {
            const deferred: any = defer()
            const propsData: any = getPropsData(options)
        
            propsData.buttons = [{
                text: propsData.okText,
                onClick: deferred.resolve,
                bold: true
            }]
        
            IosAlertView(propsData)
        
            return deferred.promise
        }
        
        Vue.prototype.$iosConfirm = (options: any) => {
            const deferred: any = defer()
            const propsData: any = getPropsData(options)
        
            propsData.buttons = [{
                text: propsData.cancelText,
                onClick: deferred.reject
            }, {
                text: propsData.okText,
                onClick: deferred.resolve,
                bold: true
            }]
        
            IosAlertView(propsData)
        
            return deferred.promise
        }

        Vue.prototype.$iosPrompt = (options: any) => {
            const deferred: any = defer()
            const propsData: any = getPropsData(options)
    
            propsData.input = true
        
            propsData.buttons = [{
                text: propsData.cancelText,
                onClick: deferred.reject
            }, {
                text: propsData.okText,
                onClick: (data: any) => {
                    deferred.resolve(data.value)
                },
                bold: true
            }]
        
            IosAlertView(propsData)
        
            return deferred.promise
        }
    }
}

export default VueIOSAlert