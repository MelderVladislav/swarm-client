import { ElMessage } from 'element-plus';

class NotificationService {
  displayErrorMessage(errorText: string) {
    ElMessage({
      message: errorText,
      type: 'error'
    })   
  }
}

export default new NotificationService()