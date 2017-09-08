require 'test_helper'

class BootstrapControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get bootstrap_index_url
    assert_response :success
  end

end
