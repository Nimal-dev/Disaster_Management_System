import React from 'react'

function Widgets() {
  return (
    <>
    <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-6 col-xl-4">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-users fa-3x text-primary"></i>
                            <div class="ms-3">
                                <p class="mb-2">Users</p>
                                <h6 class="mb-0">12</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-exclamation-triangle  fa-3x text-primary"></i>
                            <div class="ms-3">
                                <p class="mb-2">Emergency Requests</p>
                                <h6 class="mb-0">234</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm- col-xl-4">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-ambulance fa-3x text-primary"></i>
                            <div class="ms-3">
                                <p class="mb-2">Volunteers</p>
                                <h6 class="mb-0">4</h6>
                            </div>
                        </div>
                    </div>
                    {/* <div class="col-sm-6 col-xl-3">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-chart-pie fa-3x text-primary"></i>
                            <div class="ms-3">
                                <p class="mb-2">Total Revenue</p>
                                <h6 class="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
    </>
  )
}

export default Widgets