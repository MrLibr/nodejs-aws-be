import { HandlerTypes, LoggerConstants } from '../constants';
import { LOGGER, NotificationService, ProductService } from '../services';

export const catalogBatchProcess = async (event: any) => {
  const notificationService = new NotificationService();
  const productService = new ProductService();

  try {
    const products = event.Records.map((record: any) => JSON.parse(record.body));
    const newProducts = await productService.createProductBatch(products);

    await notificationService.notifyBatch(newProducts);

    LOGGER.info(`${HandlerTypes.CATALOG_BATCH_PROCESS} ${LoggerConstants.PRODUCT_WAS_CREATED_SUCCESSFUL}`);
  } catch (error) {
    LOGGER.error(`${HandlerTypes.CATALOG_BATCH_PROCESS} ${error}`);
  }
};
