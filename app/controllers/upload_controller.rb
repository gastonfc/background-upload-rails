class UploadController < ApplicationController
  def index
     render :file => '/app/views/upload/uploadfile.rhtml'
  end

  def uploadFile
    saveFiles(params[:upload])

    respond_to do |format|
      format.json { render json: "File was created", status: :created }
      format.js {}
      format.html { render text: "File has been uploaded successfully" }
    end
    #if remotipart_submitted?
      #puts "Remotipart submitted"
    #else
      #puts "Clasico submit"
      #render :text => "File has been uploaded successfully"
    #end
  end

  def saveFiles(upload)
    datafile = upload['datafile']
    if datafile.is_a?(Array)
      datafile.each { |df| DataFile.save(df.original_filename, df.read) }
    else
      file = DataFile.save(datafile.original_filename, datafile.read)
    end
  end
end
