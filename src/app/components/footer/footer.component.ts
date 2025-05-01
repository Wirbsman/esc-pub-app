import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    imports: [],
    template: `
        <footer>
            <ng-content />
        </footer>
    `,
    styles: `
        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #fbf7f7;
            padding: 15px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            border-top: 1px solid #ccc;
            box-shadow: 0 0 3px 3px #e9e9ea;
        }

        ::ng-deep button {
            background-color: #ffd600;
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            margin: 0 10px;
        }

        ::ng-deep button:hover {
            background-color: #fc9000;
        }
    `,
})
export class FooterComponent {}
