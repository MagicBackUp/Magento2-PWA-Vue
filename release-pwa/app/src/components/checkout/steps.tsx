import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { I18n, AddressType } from '@helper/interface'

@Component({
    name: 'v-steps'
})
export default class VSteps extends Vue {
    public i18n: I18n = {
        shippingStep: 'Shipping Step',
        shippingAddress: 'Shipping Address',
        firstname: 'Firstname',
        lastname: 'Lastname',
        phone: 'Phone'
    }
    public shippingAddress: AddressType = {
        firstname: '',
        lastname: '',
        phone: '',
        country: '',
        state: '',
        address: [],
        city: '',
        zipcode: ''
    }

    protected render (h: CreateElement) {
        return (
            <div class="in-steps">
                <h1 class="title">{this.i18n.shippingStep}</h1>
                <form class="in-address">
                    <h2>{this.i18n.shippingAddress}</h2>
                    <div class="v-row">
                        <label>{this.i18n.firstname}</label>
                        <v-input name="firstname" vModel={this.shippingAddress.firstname}></v-input>
                    </div>
                    <div class="v-row">
                        <label>{this.i18n.lastname}</label>
                        <v-input name="lastname" vModel={this.shippingAddress.lastname}></v-input>
                    </div>
                    <div class="v-row">
                        <label>{this.i18n.phone}</label>
                        <v-input name="phone" vModel={this.shippingAddress.phone}></v-input>
                    </div>
                </form>
            </div>
        )
    }
}