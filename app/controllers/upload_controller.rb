class UploadController < ApplicationController
  def index
     render :file => '/app/views/upload/uploadfile.rhtml'
  end

  def uploadFile
    saveFile(params[:upload])
    render :text => "File has been uploaded successfully"
  end

  def saveFile(upload)
    datafile = upload['datafile']
    if datafile.is_a?(Array)
      
      datafile.each { |df| DataFile.save(df.original_filename, df.read) }
    else
      file = DataFile.save(datafile.original_filename, datafile.read)
    end
  end
end
