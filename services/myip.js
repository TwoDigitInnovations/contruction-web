import axios from "axios";
import { Api } from "./service";

export default async function getip() {
    return Api("get", `userip`, "", '').then(
        (res) => {
            console.log(res);
            return res.data
        },
        (err) => {
            console.log(err);

        }
    );

    // return res.data
}