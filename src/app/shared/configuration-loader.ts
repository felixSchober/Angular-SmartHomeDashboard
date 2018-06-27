import * as widgetConfigurationData from './../../assets/dashboardConfiguration.json';
import { IWidget } from '../interfaces/IWidget';
import { WidgetConfigurationModel } from '../models/widget-configuration.model';
import { WidgetClock } from '../models/widgets/WidgetClock';
import { WidgetGraphLine } from '../models/widgets/WidgetGraphLine';
import { WidgetStatus } from '../models/widgets/WidgetStatus';
import { WidgetImage } from '../models/widgets/WidgetImage';
import { WidgetNumber } from '../models/widgets/WidgetNumber';
import { WidgetSwitch } from '../models/widgets/WidgetSwitch';
import { WidgetSwitchScene } from '../models/widgets/WidgetSwitchScene';

export class ConfigurationLoader {
    static loadConfiguration(): WidgetConfigurationModel[] {
        const result: WidgetConfigurationModel[] = [];

        ConfigurationLoader.validate();

        const pages = widgetConfigurationData.default.pages;

        for (let i = 0; i < pages.length; i++) {
            const newPage = new WidgetConfigurationModel(pages[i].name, pages[i].icon, pages[i].index);

            // add widgets
            const widgets = pages[i].widgets;
            widgets.forEach(widget => {
                // create widget based on type
                let widgetInstance: IWidget;
                try {
                    switch (widget.type) {
                        case 'clock':
                            widgetInstance = WidgetClock.parser(widget);
                            break;
                        case 'lineGraph':
                            widgetInstance = WidgetGraphLine.parser(widget);
                            break;
                        case 'image':
                            widgetInstance = WidgetImage.parser(widget);
                            break;
                        case 'number':
                            widgetInstance = WidgetNumber.parser(widget);
                            break;
                        case 'status':
                            widgetInstance = WidgetStatus.parser(widget);
                            break;
                        case 'switch':
                            widgetInstance = WidgetSwitch.parser(widget);
                            break;
                        case 'switchScene':
                            widgetInstance = WidgetSwitchScene.parser(widget);
                            break;
                        default:
                            throw Error('Could not match widget type ' + widget.type);
                    }
                } catch (error) {
                    console.error('Could not parse widget for page ' + i + '. Error: ' + error);
                    return;
                }

                newPage.addWidget(widgetInstance);
            });
            result.push(newPage);
        }

        return result;
    }

    private static validate() {
        if (!widgetConfigurationData) {
            throw Error('Could not load widget configuration data.');
        }

        if (!widgetConfigurationData.default.pages) {
            throw Error('Could not get pages attribute from configuration data.');
        }

        const pages = widgetConfigurationData.default.pages as any[];

        if (pages.length === 0) {
            throw Error('Widget configuration data does not contain any pages');
        }
    }
}
